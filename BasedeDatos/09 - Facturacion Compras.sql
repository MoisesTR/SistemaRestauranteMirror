USE pruebas_node
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
	IdEstadoFactura INT NOT NULL DEFAULT 2, --Abierta por default
	NombVendedor	NVARCHAR(100) NULL,
	FechaIngreso	SMALLDATETIME NOT NULL,
	FechaRecepcion	DATETIME NOT NULL,
	SubTotal		NUMERIC(7,3) DEFAULT 0 CHECK(SubTotal >= 0) NOT NULL,
	TotalIva		NUMERIC(7,3) DEFAULT 0 CHECK(TotalIva >= 0) NOT NULL,
	CambioActual	NUMERIC(7,3) CHECK(CambioActual > 0) NOT NULL,
	TotalDescuento	NUMERIC(7,3) DEFAULT 0 CHECK(TotalDescuento >= 0) NOT NULL,
	TotalCordobas	NUMERIC(7,3) DEFAULT 0 CHECK(TotalCordobas >= 0) NOT NULL,
	Retencion		BIT NOT NULL,
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
	PrecioUnitario		NUMERIC(7,3) NOT NULL CHECK(PrecioUnitario >= 0),
	Cantidad			INT NOT NULL CHECK(Cantidad > 0),
	GravadoIva			BIT NOT NULL,
	SubTotal			NUMERIC(7,3),
	SubTotal_Cal		AS CAST(ROUND((Cantidad * PrecioUnitario),3) AS NUMERIC(7,3)),
	Iva					NUMERIC(7,3),
	Iva_Cal				AS CAST(ROUND(((Cantidad * PrecioUnitario) * GravadoIva * 0.15),3) AS NUMERIC(7,3)),
	Descuento			Numeric(7,3) NOT NULL CHECK(Descuento >= 0),
	TotalDetalle		NUMERIC(7,3) NOT NULL,
	Total_Cal			AS CAST(ROUND((((Cantidad * PrecioUnitario) + (Cantidad * PrecioUnitario * GravadoIva * 0.15)) - Descuento),3) AS NUMERIC(7,3)),
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
	@IdTrabajador	 INT,
	@NombVendedor	NVARCHAR(100),
	@FechaIngreso	SMALLDATETIME,
	@SubTotal		NUMERIC(7,3),
	@TotalIva		NUMERIC(7,3),	
	@CambioActual	NUMERIC(7,3),
	@TotalDescuento	NUMERIC(7,3),
	@TotalCordobas	NUMERIC(7,3),
	@Retencion		BIT,
	@IdFactura		INT OUTPUT
)
AS BEGIN
	INSERT INTO dbo.FACTURA_COMPRA(IdProveedor,NumRefFactura, IdTrabajador, NombVendedor,
		FechaIngreso, SubTotal, TotalIva,CambioActual, TotalDescuento, TotalCordobas,Retencion)
	VALUES(@IdProveedor,@NumRefFactura, @IdTrabajador, @NombVendedor, @FechaIngreso, @Subtotal,
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
	@PrecioUnitario NUMERIC(7,3),
	@Cantidad		INT,
	@GravadoIva		BIT ,
	@SubTotal		NUMERIC(7,3),
	@Iva			NUMERIC(7,3),
	@Descuento		NUMERIC(7,3),
	@TotalDetalle	NUMERIC(7,3),
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
	SELECT IdFactura, NumRefFactura, FC.IdProveedor,PRO.NombreProveedor, TRA.IdTrabajador,TRA.Nombres +' ' + TRA.Apellidos AS [TrabajadorIngreso], FC.IdEstadoFactura, NombVendedor,  FC.FechaIngreso,FC.SubTotal,
			FC.TotalIva, FC.CambioActual, FC.TotalDescuento, FC.TotalCordobas,FC.Habilitado, FC.CreatedAt
	FROM dbo.FACTURA_COMPRA FC
	INNER JOIN dbo.ESTADO_FACTURA EF
	ON FC.IdEstadoFactura = EF.IdEstadoFactura
	INNER JOIN dbo.PROVEEDOR PRO
	ON FC.IdProveedor = PRO.IdProveedor
	INNER JOIN dbo.TRABAJADOR TRA
	ON FC.IdTrabajador = TRA.IdTrabajador
	WHERE FC.FechaIngreso BETWEEN @FechaInicio AND @FechaFin AND FC.IdProveedor = ISNULL(@IdProveedor,FC.IdProveedor) 
	AND FC.IdEstadoFactura = ISNULL(@IdEstadoFactura,FC.IdEstadoFactura)
END