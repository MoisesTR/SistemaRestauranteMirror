USE pruebas_node
GO
IF OBJECT_ID('USP_CREATE_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CARGO
GO
CREATE PROCEDURE USP_CREATE_CARGO(
	@NombreCargo NVARCHAR(50),
    @DescripcionCargo NVARCHAR(150)
)
AS BEGIN
	IF EXISTS (SELECT NombreCargo FROM dbo.CARGO WHERE NombreCargo = @NombreCargo )  
		RAISERROR('Ya existe un cargo con este Nombre',14,1)  
	ELSE
	BEGIN
		INSERT INTO dbo.CARGO(NombreCargo,DescripcionCargo)
		VALUES(@NombreCargo,@DescripcionCargo)
		SELECT @@IDENTITY AS IdCargo
	END
END
GO
IF OBJECT_ID('USP_UPDATE_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CARGO
GO
CREATE PROCEDURE USP_UPDATE_CARGO(
	@IdCargo INT,
	@NombreCargo NVARCHAR(50),
    @DescripcionCargo NVARCHAR(150)
)
AS BEGIN
	UPDATE CARGO SET NombreCargo=@NombreCargo,DescripcionCargo=@DescripcionCargo, UpdateAt = GETDATE()
	WHERE IdCargo = @IdCargo
END
GO
IF OBJECT_ID('USP_GET_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CARGO
GO
CREATE PROCEDURE USP_GET_CARGO(
	@IdCargo INT
)
AS BEGIN
	SELECT IdCargo,NombreCargo,DescripcionCargo,Habilitado,CreatedAt,UpdateAt 
	FROM CARGO WHERE IdCargo = @IdCargo
END
go
IF OBJECT_ID('USP_GET_CARGOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CARGOS
GO
CREATE PROCEDURE USP_GET_CARGOS(
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		BEGIN
			SELECT IdCargo,NombreCargo,DescripcionCargo,Habilitado,CreatedAt,UpdateAt FROM CARGO
		END
	ELSE
		BEGIN
			SELECT IdCargo,NombreCargo,DescripcionCargo,Habilitado,CreatedAt,UpdateAt FROM CARGO
			WHERE Habilitado=@Habilitado
		END
END
GO
IF OBJECT_ID('USP_DISP_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_CARGO
GO
CREATE PROCEDURE USP_DISP_CARGO(
	@IdCargo	INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE dbo.CARGO SET Habilitado = @Habilitado, UpdateAt = GETDATE() 
	WHERE IdCargo=@IdCargo
END
GO
IF OBJECT_ID('USP_GET_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_TRABAJADOR(
	@IdTrabajador INT
)
AS BEGIN
	SELECT T.IdTrabajador, T.IdSucursal, S.NombreSucursal, T.IdCargo, C.NombreCargo,
			T.Nombres, T.Apellidos, T.IdTipoDocumento, T.Documento, T.Imagen,
			T.FechaNacimiento, T.Direccion, T.Telefono1, T.Telefono2, T.FechaIngreso,
			T.Habilitado, T.CreatedAt,T.UpdateAt
	FROM dbo.TRABAJADOR T 
	INNER JOIN dbo.SUCURSAL S ON T.IdSucursal= S.IdSucursal
	INNER JOIN dbo.CARGO C ON T.IdCargo = C.IdCargo
	WHERE T.IdTrabajador = @IdTrabajador
END
go
IF OBJECT_ID('dbo.USP_GET_TRABAJADORES','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_TRABAJADORES
GO
CREATE PROCEDURE dbo.USP_GET_TRABAJADORES(
	@Habilitado		BIT NULL,
	@IdSucursal		INT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT T.IdTrabajador,T.IdSucursal,S.NombreSucursal,T.IdCargo,C.NombreCargo,T.Nombres,
				T.Apellidos,U.Username,T.IdTipoDocumento,T.Documento, T.Imagen, FechaNacimiento,T.Direccion, 
				T.Telefono1, T.Telefono2,T.FechaIngreso,T.Habilitado,T.CreatedAt
		FROM dbo.TRABAJADOR T 
		INNER JOIN dbo.SUCURSAL S ON T.IdSucursal= S.IdSucursal
		INNER JOIN dbo.CARGO C ON T.IdCargo = C.IdCargo
		LEFT  JOIN dbo.USUARIO	U ON T.IdTrabajador = U.IdTrabajador
		WHERE T.IdSucursal = ISNULL(@IdSucursal, T.IdSucursal)
	ELSE
		SELECT T.IdTrabajador,T.IdSucursal,S.NombreSucursal,T.IdCargo,C.NombreCargo,T.Nombres,
				T.Apellidos,U.Username,T.IdTipoDocumento,T.Documento, T.Imagen, FechaNacimiento,T.Direccion, 
				T.Telefono1, T.Telefono2,T.FechaIngreso,T.Habilitado,T.CreatedAt
		FROM dbo.TRABAJADOR T 
		INNER JOIN dbo.SUCURSAL S ON T.IdSucursal= S.IdSucursal
		INNER JOIN dbo.CARGO C ON T.IdCargo = C.IdCargo
		LEFT  JOIN dbo.USUARIO U ON T.IdTrabajador = U.IdTrabajador
		WHERE T.Habilitado = @Habilitado
		AND T.IdSucursal = ISNULL(@IdSucursal, T.IdSucursal)
END
GO
IF OBJECT_ID('USP_DISP_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_TRABAJADOR
GO
CREATE PROCEDURE USP_DISP_TRABAJADOR(
	@IdTrabajador	INT,
	@Habilitado		BIT
) AS BEGIN
	UPDATE dbo.TRABAJADOR SET Habilitado = @Habilitado,UpdateAt=GETDATE() 
	WHERE IdTrabajador = @IdTrabajador
END
GO
--IF OBJECT_ID('USP_GET_TELEFONOS_TRABAJADOR','P') IS NOT NULL
--	DROP PROCEDURE USP_GET_TELEFONOS_TRABAJADOR
--GO
--CREATE PROCEDURE USP_GET_TELEFONOS_TRABAJADOR(
--	@IdTrabajador INT,
--	@Habilitado BIT
--) AS BEGIN
--	IF @Habilitado IS NULL
--		SELECT IdTelefoNOTrabajador,IdTrabajador,NumeroTelefono,TT.Habilitado,TT.CreatedAt,TT.UpdateAt 
--		FROM TELEFONO_TRABAJADOR TT
--		WHERE TT.IdTrabajador= @IdTrabajador
--	ELSE
--		SELECT IdTelefoNOTrabajador,IdTrabajador,NumeroTelefono,TT.Habilitado,TT.CreatedAt,TT.UpdateAt 
--		FROM TELEFONO_TRABAJADOR TT
--		WHERE TT.IdTrabajador= @IdTrabajador AND TT.Habilitado= @Habilitado
--END
GO
IF OBJECT_ID('USP_GET_DETALLE_BODEGA_AP','P') IS NOT NULL
	DROP PROCEDURE USP_GET_DETALLE_BODEGA_AP
GO
CREATE PROCEDURE USP_GET_DETALLE_BODEGA_AP
	@IdBodegaAreaP INT
AS BEGIN
	SELECT	IdDetalle,	IdBodegaAreaP,	IdDetalleEntradaAP,	IdEntradaBodegaAP,	PP.IdProveedor,	
			DAP.IdProductoProveedor,	P.IdProducto, P.NombreProducto,	CP.IdCategoria,	C.NombreCategoria,
			P.IdSubClasificacion,	SP.NombreSubClasificacion,	SP.IdClasificacion,	CP.NombreClasificacion,
			Cantidad,	FechaHoraIngreso,	FechaHoraProduccion,	DAP.Habilitado 
	FROM dbo.DETALLE_BODEGA_AP DAP
	INNER JOIN PRODUCTO_PROVEEDOR PP 
		ON DAP.IdProductoProveedor = PP.IdProductoProveedor
	INNER JOIN PRODUCTO  P 
		ON PP.IdProducto = P.IdProducto
	INNER JOIN SUBCLASIFICACION_PRODUCTO SP 
		ON P.IdSubClasificacion = SP.IdSubClasificacion
	INNER JOIN CLASIFICACION_PRODUCTO CP 
		ON SP.IdClasificacion = CP.IdClasificacion
	INNER JOIN CATEGORIA_PRODUCTO C
		ON CP.IdCategoria = C.IdCategoria
END
GO
IF OBJECT_ID('USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION','P') IS NOT NULL
	DROP PROCEDURE USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION
GO
CREATE PROCEDURE USP_INSERT_ENTRADA_BODEGA_AREA_PRODUCCION(
	@IdBodegaAreaP INT,
    @IdTrabajador INT,
	@IdProveedor INT,
	@NFactura NVARCHAR(20),
	@RepresentanteProveedor NVARCHAR(50),
	--SubTotalFactura MONEY NULL CHECK(SubTotalFactura > 0),
	@PorcRetencion NUMERIC(10,5) NULL,
	--Retencion MONEY NULL,
	@PorcIva NUMERIC(10,5) NULL,
	--IvaTotal MONEY NULL,
	@PorcDescuento NUMERIC(10,5) NULL,
	--DescuentoTotal MONEY NULL CHECK(DescuentoTotal >= 0),
	--TotalFactura MONEY NULL,
	@FechaHora DATETIME
)
AS BEGIN
	INSERT INTO ENTRADA_BODEGA_AREA_PRODUCCION(IdBodegaAreaP,IdTrabajador,IdProveedor,NFactura,RepresentanteProveedor,PorcRetencion,PorcIva,PorcDescuento,FechaHora)
	values(@IdBodegaAreaP,@IdTrabajador,@IdProveedor,@NFactura,@RepresentanteProveedor,@PorcRetencion,@PorcIva,@PorcDescuento,@FechaHora)
END
GO
IF OBJECT_ID('USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION','P') IS NOT NULL
	DROP PROCEDURE USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION
GO
CREATE PROCEDURE USP_INSERT_DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION(
	@IdEntradaBodegaAP INT,
    @IdProductoProveedor INT,
    @Cantidad INT,
	@PrecioUnitarioEntrada MONEY,
	@DescuentoCalculado MONEY
)
AS BEGIN
	DECLARE @PrecioUnitarioActual MONEY
	
	INSERT INTO dbo.DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION(IdEntradaBodegaAP,IdProductoProveedor,Cantidad,PrecioUnitarioEntrada,DescuentoCalculado)
	VALUES(@IdEntradaBodegaAP,@IdProductoProveedor,@Cantidad,@PrecioUnitarioEntrada,@DescuentoCalculado)
END
GO
IF OBJECT_ID('USP_GENERAR_FACTURA','P') IS NOT NULL
	DROP PROCEDURE USP_GENERAR_FACTURA
GO
CREATE PROCEDURE USP_GENERAR_FACTURA
	@IdEntradaBodegaAP INT
AS BEGIN
	UPDATE ENTRADA_BODEGA_AREA_PRODUCCION SET IdEstadoEdicion = 2,UpdateAt=GETDATE() WHERE IdEntradaBodegaAP = @IdEntradaBodegaAP
END
GO
IF OBJECT_ID('USP_GET_CLASIFICACION_UDM','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACION_UDM
GO
--Nombre anterior GetClasificacion
CREATE PROCEDURE USP_GET_CLASIFICACION_UDM(
	@IdClasificacionUnidadMedida INT
) AS BEGIN 
	SELECT IdClasificacionUnidadMedida,NombreClasificacion,Descripcion,Habilitado FROM CLASIFICACION_UNIDAD_MEDIDA WHERE IdClasificacionUnidadMedida = @IdClasificacionUnidadMedida;
END
GO
IF OBJECT_ID('USP_GET_CLASIFICACIONES_UDM','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACIONES_UDM
GO
CREATE PROCEDURE USP_GET_CLASIFICACIONES_UDM
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdClasificacionUnidadMedida,NombreClasificacion,Descripcion,Habilitado FROM CLASIFICACION_UNIDAD_MEDIDA;
	ELSE
		SELECT IdClasificacionUnidadMedida,NombreClasificacion,Descripcion,Habilitado FROM CLASIFICACION_UNIDAD_MEDIDA
		WHERE Habilitado= @Habilitado
END
GO
IF OBJECT_ID('dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION') IS NOT NULL
	DROP PROCEDURE dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION
GO
CREATE PROCEDURE dbo.USP_INSERT_TIPO_DOCUMENTO_IDENTIFICACION (
	@NombreTD		NVARCHAR(50),
	@DescripcionTD	NVARCHAR(150)
)
AS BEGIN
	IF EXISTS(SELECT IdTipoDocumento FROM dbo.TIPO_DOCUMENTO_IDENTIFICACION WHERE NombreTD = @NombreTD)
		BEGIN
			RAISERROR('Ya existe un tipo de documento llamado "%s".',16,1,@NombreTD)
		END
	ELSE
		BEGIN
			INSERT INTO dbo.TIPO_DOCUMENTO_IDENTIFICACION(NombreTD, DescripcionTD)
			VALUES(@NombreTD, @DescripcionTD)

			SELECT @@IDENTITY AS IdTipoDocumento
		END
END
GO
IF OBJECT_ID('dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION
GO
CREATE PROCEDURE dbo.USP_UPDATE_TIPO_DOCUMENTO_IDENTIFICACION(
	@IdTipoDocumento	INT,
	@NombreTD			NVARCHAR(50),
	@DescripcionTD		NVARCHAR(50)
)
AS BEGIN
	UPDATE dbo.TIPO_DOCUMENTO_IDENTIFICACION SET NombreTD=@NombreTD, DescripcionTD = @DescripcionTD  , UpdatedAt = GETDATE()
	WHERE IdTipoDocumento = @IdTipoDocumento
END
GO
IF OBJECT_ID('dbo.USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION;
GO
CREATE PROCEDURE [dbo].[USP_GET_TIPOS_DOCUMENTOS_IDENTIFICACION](
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT	IdTipoDocumento, NombreTD, DescripcionTD, Habilitado, CreatedAt
		FROM	dbo.TIPO_DOCUMENTO_IDENTIFICACION
	ELSE
		SELECT	IdTipoDocumento, NombreTD, DescripcionTD, Habilitado,CreatedAt
		FROM	dbo.TIPO_DOCUMENTO_IDENTIFICACION T 
		WHERE T.Habilitado = @Habilitado
END
GO
IF OBJECT_ID('dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION
GO
CREATE PROCEDURE dbo.USP_DISP_TIPO_DOCUMENTO_IDENTIFICACION(
	@IdTipoDocumento	INT,
	@Habilitado			BIT
)
AS BEGIN
	UPDATE dbo.TIPO_DOCUMENTO_IDENTIFICACION SET Habilitado = @Habilitado , UpdatedAt = GETDATE()
	WHERE	IdTipoDocumento = @IdTipoDocumento
END