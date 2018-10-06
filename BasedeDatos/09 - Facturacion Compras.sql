USE pruebas_node
GO
IF OBJECT_ID('dbo.BITACORA_CAMBIOS_FACTURA') IS NOT NULL DROP TABLE dbo.BITACORA_CAMBIOS_FACTURA
GO
IF OBJECT_ID('dbo.DETALLE_FACTURA_COMPRA') is not null drop table dbo.DETALLE_FACTURA_COMPRA
go

IF OBJECT_ID('dbo.FACTURA_COMPRA') is not null drop table dbo.FACTURA_COMPRA
go

IF OBJECT_ID('dbo.ESTADO_FACTURA') is not null drop table dbo.ESTADO_FACTURA
go
IF OBJECT_ID('dbo.SERIE_DOCUMENTO') is not null drop table dbo.SERIE_DOCUMENTO
go
CREATE TABLE dbo.SERIE_DOCUMENTO(
	Serie		VARCHAR(5) NOT NULL,
	DescDoc		VARCHAR(150) NOT NULL,
	CONSTRAINT 	PK_SERIE_DOCUMENTO PRIMARY KEY(Serie)
)
GO
INSERT INTO dbo.SERIE_DOCUMENTO
	VALUES('F/C','Factura de Compra')
GO
CREATE TABLE dbo.ESTADO_FACTURA(
	IdEstadoFactura INT IDENTITY(1,1),
	NombreEstado	NVARCHAR(50) NOT NULL,
	DescripcionEstado NVARCHAR(150) NULL,
	CONSTRAINT PK_ESTADO_FACTURA PRIMARY KEY(IdEstadoFactura)
)
GO
INSERT INTO ESTADO_FACTURA(NombreEstado, DescripcionEstado)
VALUES('Borrador',null),('Abierta(En Edicion)','Que la factura se esta ingresando, y no se ha calculado'),
('Cerrada', null), ('Cancelada', null)
GO
CREATE TABLE FACTURA_COMPRA(
	IdFactura		INT IDENTITY(1,1),
	Serie			VARCHAR(5) DEFAULT 'F/C' NOT NULL,
	NumRefFactura	NVARCHAR(50) NOT NULL UNIQUE,
	IdProveedor		INT NOT NULL, --
	IdTrabajador	INT NOT NULL,
	IdTipoMoneda	INT NOT NULL DEFAULT 1,
	IdFormaPago		INT NOT NULL DEFAULT 1,
	IdEstadoFactura INT NOT NULL DEFAULT 2, --Abierta por default
	NombVendedor	NVARCHAR(100) NULL,
	FechaFactura	SMALLDATETIME NOT NULL,
	FechaRecepcion	DATETIME NOT NULL,
	SubTotal		NUMERIC(14,2) DEFAULT 0 CHECK(SubTotal >= 0) NOT NULL,
	TotalIva		NUMERIC(14,2) DEFAULT 0 CHECK(TotalIva >= 0) NOT NULL,
	CambioActual	NUMERIC(14,2) CHECK(CambioActual > 0) NOT NULL,
	TotalDescuento	NUMERIC(14,2) DEFAULT 0 CHECK(TotalDescuento >= 0) NOT NULL,
	TotalCordobas	NUMERIC(14,2) DEFAULT 0 CHECK(TotalCordobas >= 0) NOT NULL,
	Retencion		BIT NOT NULL,
	Respaldo		NVARCHAR(200) NULL DEFAULT 'noimage.png',
	Habilitado	BIT DEFAULT 1 NOT NULL,
	CreatedAt	SMALLDATETIME DEFAULT GETDATE() NOT NULL,
	UpdateAt	SMALLDATETIME NULL,
	CONSTRAINT Pk_FacturaCompra PRIMARY KEY(IdFactura),
	CONSTRAINT fk_ProveedorFactura FOREIGN KEY(IdProveedor) 
		REFERENCES dbo.PROVEEDOR(IdProveedor),
	CONSTRAINT FK_TrabajadorIngresaFacturaCompra FOREIGN KEY(IdTrabajador) 
		REFERENCES dbo.TRABAJADOR(IdTrabajador),
	CONSTRAINT FK_EstadoFacturaCompra FOREIGN KEY( IdEstadoFactura) 
		REFERENCES dbo.ESTADO_FACTURA(IdEstadoFactura),
	CONSTRAINT FK_SerieFacturaCompra FOREIGN KEY(Serie)
		REFERENCES dbo.SERIE_DOCUMENTO(Serie)
)
GO
CREATE TABLE DETALLE_FACTURA_COMPRA(
	IdDetalle			INT IDENTITY(1,1) NOT NULL,
	IdFactura			INT NOT NULL,
	IdProducto			INT NOT NULL,
	PrecioUnitario		NUMERIC(14,2) NOT NULL CHECK(PrecioUnitario >= 0),
	Cantidad			INT NOT NULL CHECK(Cantidad > 0),
	GravadoIva			BIT NOT NULL,
	SubTotal			NUMERIC(14,2),
	SubTotal_Cal		AS CAST(ROUND((Cantidad * PrecioUnitario),2) AS NUMERIC(14,2)),
	Iva					NUMERIC(14,2),
	Iva_Cal				AS CAST(ROUND(((Cantidad * PrecioUnitario) * GravadoIva * 0.15),2) AS NUMERIC(14,2)),
	Descuento			Numeric(14,2) NOT NULL CHECK(Descuento >= 0),
	TotalDetalle		NUMERIC(14,2) NOT NULL,
	Total_Cal			AS CAST(ROUND((((Cantidad * PrecioUnitario) + (Cantidad * PrecioUnitario * GravadoIva * 0.15)) - Descuento),2) AS NUMERIC(14,2)),
	Bonificacion		BIT DEFAULT 0 NOT NULL,
	Habilitado			BIT DEFAULT 1 NOT NULL,
	CreatedAt			DATE NOT NULL DEFAULT GETDATE(),
	UpdateAt			SMALLDATETIME NULL,
	CONSTRAINT PK_DetalleFacturaCompra PRIMARY KEY(IdDetalle, IdFactura),
	CONSTRAINT FK_FacturaCompraDetalle FOREIGN KEY(IdFactura) REFERENCES FACTURA_COMPRA(IdFactura),
	CONSTRAINT FK_ProductoFacturaCompra FOREIGN KEY(IdProducto) REFERENCES PRODUCTO(IdProducto)
)
GO
IF OBJECT_ID('dbo.USP_CREATE_FACTURA_COMPRA', N'P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_FACTURA_COMPRA
GO
CREATE PROCEDURE USP_CREATE_FACTURA_COMPRA(
	@NumRefFactura  NVARCHAR(50),
	@IdProveedor	INT,
	@IdTrabajador	INT,
	@IdTipoMoneda	INT,
	@IdFormaPago	INT,
	@NombVendedor	NVARCHAR(100),
	@FechaFactura	SMALLDATETIME,
	@FechaRecepcion	SMALLDATETIME,
	@SubTotal		NUMERIC(14,2),
	@TotalIva		NUMERIC(14,2),	
	@CambioActual	NUMERIC(14,2),
	@TotalDescuento	NUMERIC(14,2),
	@TotalCordobas	NUMERIC(14,2),
	@Retencion		BIT,
	@IdFactura		INT OUTPUT
)
AS BEGIN

	IF EXISTS(SELECT NumRefFactura FROM dbo.FACTURA_COMPRA WHERE NumRefFactura = @NumRefFactura) 
	BEGIN 
		RAISERROR('El codigo de la factura ya se encuentra registrado!',16,1)
		RETURN	
	END

	INSERT INTO dbo.FACTURA_COMPRA(IdProveedor,NumRefFactura, IdTrabajador,IdTipoMoneda, IdFormaPago, NombVendedor,
		FechaFactura,FechaRecepcion, SubTotal, TotalIva,CambioActual, TotalDescuento, TotalCordobas,Retencion)
	VALUES(@IdProveedor,@NumRefFactura, @IdTrabajador,@IdTipoMoneda, @IdFormaPago, @NombVendedor, @FechaFactura,@FechaRecepcion, @Subtotal,
			@TotalIva, @CambioActual, @TotalDescuento, @TotalCordobas, @Retencion)
	SET @IdFactura = @@IDENTITY
END
GO
IF OBJECT_ID('dbo.USP_CREATE_DETALLE_FACTURA_COMPRA', N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_CREATE_DETALLE_FACTURA_COMPRA
GO
CREATE PROCEDURE USP_CREATE_DETALLE_FACTURA_COMPRA(
	@IdDetalle		INT OUTPUT,
	@IdFactura		INT ,
	@IdProducto		INT ,
	@PrecioUnitario NUMERIC(14,2),
	@Cantidad		INT,
	@GravadoIva		BIT ,
	@SubTotal		NUMERIC(14,2),
	@Iva			NUMERIC(14,2),
	@Descuento		NUMERIC(14,2),
	@TotalDetalle	NUMERIC(14,2),
	@Bonificacion	BIT NULL
)
AS BEGIN
	INSERT INTO DETALLE_FACTURA_COMPRA(IdFactura, IdProducto, PrecioUnitario, Cantidad,
				GravadoIva, SubTotal, Iva, Descuento, TotalDetalle, Bonificacion)
	VALUES(@IdFactura, @IdProducto, @PrecioUnitario, @Cantidad, @GravadoIva,@SubTotal,
			@Iva, @Descuento,@TotalDetalle, @Bonificacion )
	
	SELECT @IdDetalle = @@IDENTITY
END
GO
GO
IF OBJECT_ID('dbo.USP_GET_FACTURAS_COMPRA',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_FACTURAS_COMPRA
GO
CREATE PROCEDURE dbo.USP_GET_FACTURAS_COMPRA (
	@FechaInicio		SMALLDATETIME,
	@FechaFin			SMALLDATETIME,
	@IdProveedor		INT NULL,
	@IdEstadoFactura	INT NULL
)
AS BEGIN

	SELECT IdFactura
			, NumRefFactura
			, FC.IdProveedor
			, FC.IdTipoMoneda
			, FC.IdFormaPago
			, PRO.NombreProveedor
			, TRA.IdTrabajador
			, TRA.Nombres +' ' + TRA.Apellidos AS [TrabajadorIngreso]
			, FC.IdEstadoFactura
			, NombVendedor
			, FechaFactura = CONVERT(VARCHAR(10),FC.FechaFactura,126)
			, FechaRecepcion = CONVERT(VARCHAR(10),FC.FechaRecepcion,126)
			, FC.SubTotal
			, FC.TotalIva
			, FC.CambioActual
			, FC.TotalDescuento
			, FC.TotalCordobas
			, FC.Habilitado
			, FechaIngreso = FC.CreatedAt 
			, HoraIngreso = CONVERT(VARCHAR(10),FC.CreatedAt,108) + ' ' + RIGHT(CONVERT(VARCHAR(30), FC.CreatedAt , 9), 2) 
	FROM	dbo.FACTURA_COMPRA FC
			INNER JOIN dbo.ESTADO_FACTURA EF
				ON FC.IdEstadoFactura = EF.IdEstadoFactura
			INNER JOIN dbo.PROVEEDOR PRO
				ON FC.IdProveedor = PRO.IdProveedor
			INNER JOIN dbo.TRABAJADOR TRA
				ON FC.IdTrabajador = TRA.IdTrabajador
	WHERE	FC.CreatedAt BETWEEN ISNULL(@FechaInicio,FC.CreatedAt) AND ISNULL(@FechaFin,FC.CreatedAt)  AND FC.IdProveedor = ISNULL(@IdProveedor,FC.IdProveedor) 
			AND FC.IdEstadoFactura = ISNULL(@IdEstadoFactura,FC.IdEstadoFactura)
END



