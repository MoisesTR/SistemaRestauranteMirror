USE pruebas_node;
GO
IF OBJECT_ID('USP_CREATE_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_PRODUCTO
GO
CREATE PROCEDURE USP_CREATE_PRODUCTO(
	@IdCategoria INT,
    @IdSubclasificacion INT,
    @IdEstado int,
    @NombreProducto NVARCHAR(50),
    @Descripcion NVARCHAR(200),
    @Imagen NVARCHAR(100)
) AS BEGIN
	IF EXISTS (SELECT NombreProducto FROM dbo.PRODUCTO WHERE @NombreProducto = NombreProducto )
		RAISERROR('El nombre del producto ya existe',16,1)
	ELSE
		BEGIN
		INSERT INTO PRODUCTO(IdCategoria,IdSubclasificacion,IdEstado,NombreProducto,Descripcion,Imagen)
		VALUES(@IdCategoria,@IdSubclasificacion,@IdEstado,@NombreProducto,@Descripcion,@Imagen)
		SELECT @@IDENTITY AS IdProducto
		END 
END 
GO
IF OBJECT_ID('USP_UPDATE_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PRODUCTO
GO
CREATE PROCEDURE USP_UPDATE_PRODUCTO(
	@IdProducto INT,
    @IdCategoria INT,
    @IdSubclasificacion INT,
    @IdEstado int,
    @NombreProducto NVARCHAR(50),
    @Descripcion NVARCHAR(200),
    @Imagen NVARCHAR(100) NULL
) AS BEGIN 
	UPDATE dbo.PRODUCTO SET IdCategoria=@IdCategoria,IdSubclasificacion=@IdSubclasificacion,IdEstado=@IdEstado,
		NombreProducto=@NombreProducto,Descripcion=@Descripcion,Imagen=@Imagen,UpdateAt=GETDATE()
    WHERE IdProducto = @IdProducto;
END
GO
IF OBJECT_ID('USP_GET_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTO
GO
CREATE PROCEDURE USP_GET_PRODUCTO(
	@IdProducto INT
)
AS BEGIN
	SELECT IdProducto,P.IdCategoria,CP.NombreCategoria,P.IdSubclasificacion,SC.NombreSubclasificacion,C.IdClasificacion,C.NombreClasificacion,IdEstado,NombreProducto,Descripcion,Imagen,P.DiasCaducidad,P.Habilitado,P.CreatedAt,P.UpdateAt 
	FROM dbo.PRODUCTO P
	INNER JOIN dbo.CATEGORIA_PRODUCTO CP ON P.IdCategoria = CP.IdCategoria
	INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC ON P.IdSubclasificacion = SC.IdSubclasificacion
	INNER JOIN dbo.CLASIFICACION_PRODUCTO C ON SC.IdClasificacion = C.IdClasificacion
	 WHERE IdProducto =@IdProducto
END
GO
IF OBJECT_ID('USP_GET_PRODUCTOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS
GO
CREATE PROCEDURE USP_GET_PRODUCTOS
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado is NULL
		SELECT IdProducto,P.IdCategoria,CP.NombreCategoria,P.IdSubclasificacion,SC.NombreSubclasificacion,C.IdClasificacion,C.NombreClasificacion,IdEstado,NombreProducto,Descripcion,Imagen,P.DiasCaducidad,P.Habilitado,P.CreatedAt,P.UpdateAt 
		FROM dbo.PRODUCTO P
		INNER JOIN dbo.CATEGORIA_PRODUCTO CP ON P.IdCategoria = CP.IdCategoria
		INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC ON P.IdSubclasificacion = SC.IdSubclasificacion
		INNER JOIN dbo.CLASIFICACION_PRODUCTO C ON SC.IdClasificacion = C.IdClasificacion
	ELSE
		SELECT IdProducto,P.IdCategoria,CP.NombreCategoria,P.IdSubclasificacion,SC.NombreSubclasificacion,C.IdClasificacion,C.NombreClasificacion,IdEstado,NombreProducto,Descripcion,Imagen,P.DiasCaducidad,P.Habilitado,P.CreatedAt,P.UpdateAt 
		FROM dbo.PRODUCTO P
		INNER JOIN dbo.CATEGORIA_PRODUCTO CP ON P.IdCategoria = CP.IdCategoria
		INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC ON P.IdSubclasificacion = SC.IdSubclasificacion
		INNER JOIN dbo.CLASIFICACION_PRODUCTO C ON SC.IdClasificacion = C.IdClasificacion WHERE P.Habilitado = @Habilitado
END
GO
IF OBJECT_ID('USP_DISP_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_PRODUCTO
GO
CREATE PROCEDURE USP_DISP_PRODUCTO(
	@IdProducto INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE dbo.PRODUCTO SET Habilitado = @Habilitado,UpdateAt=GETDATE() 
	WHERE IdProducto=@IdProducto
END
go
IF OBJECT_ID('dbo.USP_GET_PRODUCTOS_PROVEEDORES','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_PRODUCTOS_PROVEEDORES
GO
CREATE PROCEDURE dbo.USP_GET_PRODUCTOS_PROVEEDORES
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado is NULL
		SELECT *, Cantidad = 1, Descuento = 0, GravadoIva = 0 FROM V_ProductosDetallados;
	ELSE
		SELECT *, Cantidad = 1, Descuento = 0, GravadoIva = 0 FROM V_ProductosDetallados WHERE Habilitado = @Habilitado;
END 
GO
IF OBJECT_ID('USP_GET_PRODUCTO_PROVEEDORES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTO_PROVEEDORES
GO
CREATE PROCEDURE USP_GET_PRODUCTO_PROVEEDORES(
	@IdProducto INT
) AS BEGIN
	SELECT * FROM V_ProductosDetallados WHERE IdProducto = @IdProducto;
END
GO
IF OBJECT_ID('USP_GET_PRODUCTOS_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR(
	@IdProveedor INT
) AS BEGIN
	SELECT * FROM dbo.V_ProductosDetallados WHERE IdProveedor = @IdProveedor;
END
GO
IF OBJECT_ID('dbo.USP_CREATE_EMPAQUE','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_CREATE_EMPAQUE
GO
CREATE PROCEDURE dbo.USP_CREATE_EMPAQUE(
	@NombreEmpaque	NVARCHAR(50),
	@Descripcion	NVARCHAR(150)
)
AS BEGIN
	INSERT INTO dbo.Empaque(NombreEmpaque,Descripcion)
	VALUES(@NombreEmpaque,@Descripcion)
	SELECT @@IDENTITY AS IdEmpaque
END
GO
IF OBJECT_ID('USP_DISP_EMPAQUE','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_EMPAQUE
GO
CREATE PROCEDURE dbo.USP_DISP_EMPAQUE(
	@IdEmpaque	INT,
	@Habilitado BIT
)
AS BEGIN 
	UPDATE dbo.EMPAQUE SET Habilitado=@Habilitado, UpdateAt = GETDATE() 
	WHERE IdEmpaque = @IdEmpaque
END
GO
IF OBJECT_ID('USP_GET_EMPAQUES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_EMPAQUES
GO
CREATE PROCEDURE USP_GET_EMPAQUES
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM dbo.EMPAQUE
	ELSE
		SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM dbo.EMPAQUE 
		WHERE Habilitado = @Habilitado;
END
GO
IF OBJECT_ID(N'USP_UPDATE_EMPAQUE','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_EMPAQUE
GO
CREATE PROCEDURE dbo.USP_UPDATE_EMPAQUE(
	@IdEmpaque		INT,	
	@NombreEmpaque	NVARCHAR(50),
	@Descripcion	NVARCHAR(150)
)
AS BEGIN
	UPDATE dbo.EMPAQUE SET NombreEmpaque = @NombreEmpaque, Descripcion = @Descripcion WHERE IdEmpaque = @IdEmpaque;
END
GO
IF OBJECT_ID('USP_CREATE_ENVASE','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_ENVASE
GO
CREATE PROCEDURE USP_CREATE_ENVASE(
	@NombreEnvase	NVARCHAR(50),
	@Descripcion	NVARCHAR(150)
)
AS BEGIN
	INSERT INTO dbo.Envase(NombreEnvase,Descripcion)
	VALUES(@NombreEnvase,@Descripcion)
	SELECT @@IDENTITY AS IdEnvase
END
GO
IF OBJECT_ID('USP_GET_ENVASES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ENVASES
GO
CREATE PROCEDURE USP_GET_ENVASES
	@Habilitado BIT NULL
AS BEGIN
	IF  @Habilitado IS NULL
		SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado FROM dbo.ENVASE
	ELSE
		SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado FROM dbo.ENVASE 
		WHERE Habilitado = @Habilitado
END
GO
IF OBJECT_ID('USP_DISP_ENVASE','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_ENVASE
GO
CREATE PROCEDURE dbo.USP_DISP_ENVASE(
	@IdEnvase	INT,
	@Habilitado BIT
)
AS BEGIN 
	UPDATE dbo.ENVASE SET Habilitado=@Habilitado, UpdateAt = GETDATE() 
	WHERE IdEnvase = @IdEnvase
END
GO
IF OBJECT_ID(N'dbo.USP_UPDATE_ENVASE', 'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_ENVASE
GO
CREATE PROCEDURE dbo.USP_UPDATE_ENVASE ( 
	@IdEnvase		INT,
	@NombreEnvase	NVARCHAR(50),
	@Descripcion	NVARCHAR(150)
)
AS BEGIN
	UPDATE dbo.ENVASE SET NombreEnvase = @NombreEnvase, Descripcion = @Descripcion, UpdateAt = GETDATE()
		WHERE IdEnvase = @IdEnvase
END
GO
IF OBJECT_ID('USP_GET_ESTADOSPRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ESTADOSPRODUCTO
GO
CREATE PROCEDURE USP_GET_ESTADOSPRODUCTO
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdEstado,Nombre,Descripcion,Habilitado FROM dbo.ESTADO_PRODUCTO
	ELSE
		SELECT IdEstado,Nombre,Descripcion,Habilitado FROM dbo.ESTADO_PRODUCTO WHERE Habilitado = @Habilitado
END
GO
IF OBJECT_ID('USP_GET_ESTADOPRODUCTO_BY_ID','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ESTADOPRODUCTO_BY_ID
GO
CREATE PROCEDURE USP_GET_ESTADOPRODUCTO_BY_ID(
	@IdEstado INT
)
AS BEGIN
	SELECT IdEstado,Nombre,Descripcion,Habilitado FROM ESTADO_PRODUCTO WHERE IdEstado = @IdEstado
END
GO
IF OBJECT_ID('USP_CREATE_UNIDAD_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_UNIDAD_MEDIDA
GO
CREATE PROCEDURE USP_CREATE_UNIDAD_MEDIDA(
	@IdClasificacionUnidadMedida	INT,
    @NombreUnidad					NVARCHAR(50),
    @Simbolo						NVARCHAR(3),
	@NImportancia					INT
)
AS BEGIN
	INSERT INTO UNIDAD_MEDIDA(IdClasificacionUnidadMedida,NombreUnidad,Simbolo,NImportancia)
	VALUES(@IdClasificacionUnidadMedida,@NombreUnidad,@Simbolo, @NImportancia)
	SELECT @@IDENTITY AS IdUnidadMedida
END
GO
IF OBJECT_ID('dbo.USP_UPDATE_UNIDAD_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE	dbo.USP_UPDATE_UNIDAD_MEDIDA
GO
CREATE PROCEDURE	dbo.USP_UPDATE_UNIDAD_MEDIDA (
	@IdUnidadMedida					INT,
	@IdClasificacionUnidadMedida	INT		NULL,
    @NombreUnidad					NVARCHAR(50)	NULL,
    @Simbolo						NVARCHAR(3)		NULL,
	@NImportancia					INT		NULL
)
AS BEGIN
	IF COALESCE(@IdClasificacionUnidadMedida,@NombreUnidad, @Simbolo, @NImportancia) IS NOT NULL
	BEGIN
		UPDATE dbo.UNIDAD_MEDIDA
		SET IdClasificacionUnidadMedida = ISNULL(@IdClasificacionUnidadMedida,IdClasificacionUnidadMedida), NombreUnidad = ISNULL(@NombreUnidad,NombreUnidad),
			Simbolo = ISNULL(@Simbolo,Simbolo), NImportancia = ISNULL(@NImportancia,NImportancia)
			WHERE IdUnidadMedida = @IdUnidadMedida
	END
END
GO 
IF OBJECT_ID('dbo.USP_DISP_UNIDAD_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_UNIDAD_MEDIDA
GO
CREATE PROCEDURE dbo.USP_DISP_UNIDAD_MEDIDA(
	@IdUnidadMedida			INT,
	@Habilitado				BIT
) AS BEGIN
	UPDATE dbo.UNIDAD_MEDIDA set Habilitado = @Habilitado,UpdateAt=GETDATE() Where IdUnidadMedida = @IdUnidadMedida;
END
GO
IF OBJECT_ID('USP_GET_UNIDADES_DE_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE USP_GET_UNIDADES_DE_MEDIDA
GO
CREATE PROCEDURE USP_GET_UNIDADES_DE_MEDIDA
AS BEGIN
	SELECT  UNIDAD.IdUnidadMedida
			, UNIDAD.IdClasificacionUnidadMedida
			, CLASI_UNIDAD.NombreClasificacion
			, UNIDAD.NombreUnidad
			, UNIDAD.Simbolo
			, UNIDAD.Habilitado
			, UNIDAD.NImportancia 
	FROM	dbo.UNIDAD_MEDIDA UNIDAD 
			INNER JOIN dbo.CLASIFICACION_UNIDAD_MEDIDA CLASI_UNIDAD
	ON		UNIDAD.IdClasificacionUnidadMedida = CLASI_UNIDAD.IdClasificacionUnidadMedida
	WHERE UNIDAD.Habilitado = 1
	ORDER BY UNIDAD.NImportancia DESC
END
GO
IF OBJECT_ID('USP_GET_UNIDAD_DE_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE USP_GET_UNIDAD_DE_MEDIDA
GO
CREATE PROCEDURE USP_GET_UNIDAD_DE_MEDIDA(
	@IdUnidadMedida INT
)
AS BEGIN
	SELECT  IdUnidadMedida,IdClasificacionUnidadMedida,NombreUnidad,Simbolo,NImportancia, Habilitado 
	FROM dbo.UNIDAD_MEDIDA 
	WHERE IdUnidadMedida = @IdUnidadMedida
END
GO
IF OBJECT_ID('USP_CREATE_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_SUCURSAL
GO
CREATE PROCEDURE USP_CREATE_SUCURSAL(
    @NombreSucursal NVARCHAR(100) ,
    @Direccion		NVARCHAR(250),
	@Telefono1		NVARCHAR(20),
	@Telefono2		NVARCHAR(20) NULL
)
AS BEGIN 
	INSERT INTO dbo.SUCURSAL(NombreSucursal,Direccion, Telefono1, Telefono2)
	VALUES(@NombreSucursal,@Direccion, @Telefono1, @Telefono2)
	SELECT @@IDENTITY AS IdSucursal
END
GO
IF OBJECT_ID('USP_GET_SUCURSALES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUCURSALES
GO
CREATE PROCEDURE USP_GET_SUCURSALES
	@Habilitado BIT NULL
AS 
BEGIN
	IF @Habilitado IS NULL
		SELECT IdSucursal,NombreSucursal,Direccion, Telefono1, Telefono2 from dbo.SUCURSAL
	ELSE
		SELECT IdSucursal,NombreSucursal,Direccion, Telefono1, Telefono2 from dbo.SUCURSAL WHERE Habilitado = @Habilitado
END
GO
IF OBJECT_ID('USP_GET_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUCURSAL
GO
CREATE PROCEDURE USP_GET_SUCURSAL
	@IdSucursal INT
AS 
BEGIN
	SELECT IdSucursal,NombreSucursal,Direccion, Telefono1,Telefono2 
	from dbo.SUCURSAL WHERE IdSucursal = @IdSucursal
END
GO
USE PRUEBAS_NODE
IF OBJECT_ID('USP_CREATE_PRODUCTO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_PRODUCTO_PROVEEDOR
GO
CREATE PROCEDURE USP_CREATE_PRODUCTO_PROVEEDOR(
	@IdProducto INT,
	@IdProveedor INT,
	@IdEnvase INT NULL, --id del envase si es que tiene
    @IdEmpaque INT NULL, --id del empaque si es que tiene
	@IdUnidadMedida INT,
    @ValorUnidadMedida NUMERIC(10,5),
	@CantidadEmpaque INT NULL, --si tiene empaque 
	@Costo Money,
	@DiasCaducidad INT
) AS BEGIN
	INSERT INTO PRODUCTO_PROVEEDOR(IdProducto,IdProveedor,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,Costo, DiasCaducidad)
	VALUES(@IdProducto,@IdProveedor,@IdEnvase,@IdEmpaque,@IdUnidadMedida,@ValorUnidadMedida,@CantidadEmpaque,@Costo,  @DiasCaducidad)
	SELECT @@IDENTITY AS IdProductoProveedor
END 
GO
IF OBJECT_ID('USP_UPDATE_PRODUCTO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PRODUCTO_PROVEEDOR
GO
CREATE PROCEDURE USP_UPDATE_PRODUCTO_PROVEEDOR(
	@IdProductoProveedor INT,
	@IdEnvase INT NULL, --id del envase si es que tiene
    @IdEmpaque INT NULL, --id del empaque si es que tiene
	@IdUnidadMedida INT,
    @ValorUnidadMedida NUMERIC(10,5),
	@CantidadEmpaque INT NULL, --si tiene empaque 
	@Costo Money,
	@DiasCaducidad	INT
) AS BEGIN 
	UPDATE PRODUCTO_PROVEEDOR SET IdEnvase= ISNULL(@IdEnvase, IdEnvase),IdEmpaque=@IdEmpaque,IdUnidadMedida=@IdUnidadMedida,ValorUnidadMedida=@ValorUnidadMedida,cantidadEmpaque=@CantidadEmpaque,
	Costo=ISNULL(@Costo, Costo), DiasCaducidad =  ISNULL(@DiasCaducidad, DiasCaducidad), UpdateAt=GETDATE()
    where IdProductoProveedor = @IdProductoProveedor;
END
GO
IF OBJECT_ID('USP_DISP_PRODUCTO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_PRODUCTO_PROVEEDOR
GO
CREATE PROCEDURE USP_DISP_PRODUCTO_PROVEEDOR(
	@IdProductoProveedor INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE PRODUCTO_PROVEEDOR set Habilitado = @Habilitado,UpdateAt=GETDATE() Where IdProductoProveedor = @IdProductoProveedor;
END 
GO
IF OBJECT_ID('USP_CREATE_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_TRABAJADOR
GO
CREATE PROCEDURE USP_CREATE_TRABAJADOR(
	@IdSucursal		INT NULL,
    @IdCargo		INT,
    @Nombres		NVARCHAR(50),
    @Apellidos		NVARCHAR(50),
	@Imagen			NVARCHAR(50),
	@IdTipoDocumento	INT NULL,
    @Documento	NVARCHAR(50),
    @FechaNacimiento DATE,
    @Direccion		NVARCHAR(300),
	@Telefono1		NVARCHAR(20),
	@Telefono2		NVARCHAR(20),
    @FechaIngreso DATE 
)
AS BEGIN 

	IF EXISTS (SELECT 1 FROM TRABAJADOR WHERE Documento = @Documento AND @IdTipoDocumento = 1)
	BEGIN
		RAISERROR('Esta cedula ya se encuentra registrada!!',16,1);
		RETURN
	END

	IF (@Telefono1 = @Telefono2)
	BEGIN
		RAISERROR('Los telefonos no pueden ser iguales!!',16,1)
		RETURN
	END

	INSERT INTO TRABAJADOR(IdSucursal,IdCargo,Nombres,Apellidos,IdTipoDocumento, Documento, Imagen, FechaNacimiento,Direccion, Telefono1,Telefono2,FechaIngreso)
	VALUES(@IdSucursal,@IdCargo,@Nombres,@Apellidos,ISNULL(@IdTipoDocumento,1),@Documento, @Imagen, @FechaNacimiento,@Direccion,@Telefono1, @Telefono2,@FechaIngreso)
	SELECT @@IDENTITY AS IdTrabajador
END
GO
IF OBJECT_ID('USP_UPDATE_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_TRABAJADOR
GO
CREATE PROCEDURE USP_UPDATE_TRABAJADOR(	
	@IdTrabajador	INT,
	@IdSucursal		INT NULL,
    @IdCargo		INT,
    @Nombres		NVARCHAR(50),
    @Apellidos		NVARCHAR(50),
	@IdTipoDocumento	INT,
    @Documento			NVARCHAR(50),
	@Imagen				NVARCHAR(50), 
    @FechaNacimiento	DATE,
    @Direccion			NVARCHAR(300),
	@Telefono1			NVARCHAR(20),
	@Telefono2			NVARCHAR(20),
    @FechaIngreso		DATE 
)
AS BEGIN 
	UPDATE TRABAJADOR 
	SET IdSucursal=@IdSucursal,IdCargo=@IdCargo,nombres=@Nombres,Apellidos=@Apellidos, 
		Imagen = @Imagen,Documento=@Documento,FechaNacimiento=@FechaNacimiento,
		Telefono1 = @Telefono1, Telefono2 = @Telefono2,	UpdateAt=GETDATE()
		WHERE IdTrabajador = @IdTrabajador

	IF EXISTS(SELECT 1 FROM USUARIO WHERE IdTrabajador = @IdTrabajador)
		UPDATE USUARIO SET Imagen = @Imagen FROM USUARIO WHERE IdTrabajador = @IdTrabajador
END
GO
IF	 OBJECT_ID('USP_CREATE_TELEFONO_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_TELEFONO_TRABAJADOR
GO
CREATE PROCEDURE USP_CREATE_TELEFONO_TRABAJADOR(
	@IdTrabajador INT,
	@NumeroTelefono NVARCHAR(20)
)
AS BEGIN
	INSERT INTO TELEFONO_TRABAJADOR(IdTrabajador,NumeroTelefono)
	VALUES(@IdTrabajador,@NumeroTelefono)
	SELECT @@IDENTITY AS IdTelefoNOTrabajador
END
GO
IF OBJECT_ID('USP_CREATE_TELEFONO_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_TELEFONO_SUCURSAL
GO
CREATE PROCEDURE USP_CREATE_TELEFONO_SUCURSAL(
	@IdSucursal INT,
	@NumeroTelefono NVARCHAR(20)
)
AS BEGIN
	INSERT INTO TELEFONO_SUCURSAL(IdSucursal,NumeroTelefono)
	VALUES(@IdSucursal,@NumeroTelefono)
	SELECT @@IDENTITY AS IdTelefonoSucursal
END
GO
IF OBJECT_ID('USP_UPDATE_TELEFONO_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_TELEFONO_SUCURSAL
GO
CREATE PROCEDURE USP_UPDATE_TELEFONO_SUCURSAL(
	@IdTelefonoSucursal INT,
	@IdSucursal INT,
	@NumeroTelefono NVARCHAR(20)
)
AS BEGIN
	UPDATE TELEFONO_SUCURSAL SET NumeroTelefono=@NumeroTelefono
	WHERE IdTelefonoSucursal=@IdTelefonoSucursal AND IdSucursal=@IdSucursal
END
GO
GO
IF OBJECT_ID('USP_UPDATE_TELEFONO_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_TELEFONO_TRABAJADOR
GO
CREATE PROCEDURE USP_UPDATE_TELEFONO_TRABAJADOR(
	@IdTelefoNOTrabajador INT,
	@IdTrabajador INT,
	@NumeroTelefono NVARCHAR(20)
)
AS BEGIN
	UPDATE TELEFONO_TRABAJADOR SET NumeroTelefono=@NumeroTelefono
	WHERE IdTelefoNOTrabajador=@IdTelefoNOTrabajador AND IdTrabajador=@IdTrabajador
END
GO
IF OBJECT_ID('USP_DISP_TELEFONO_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_TELEFONO_SUCURSAL
GO
CREATE PROCEDURE USP_DISP_TELEFONO_SUCURSAL(
	@IdTelefonoSucursal INT,
	@IdSucursal INT,
	@Habilitado BIT
)
AS BEGIN
	UPDATE TELEFONO_SUCURSAL SET Habilitado=@Habilitado WHERE IdTelefonoSucursal=@IdTelefonoSucursal AND IdSucursal=@IdSucursal
END
GO
IF OBJECT_ID('USP_DISP_TELEFONO_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_TELEFONO_TRABAJADOR
GO
CREATE PROCEDURE USP_DISP_TELEFONO_TRABAJADOR(
	@IdTelefoNOTrabajador INT,
	@IdTrabajador INT,
	@Habilitado BIT
)
AS BEGIN
	UPDATE TELEFONO_TRABAJADOR SET Habilitado=@Habilitado WHERE IdTelefoNOTrabajador=@IdTelefoNOTrabajador AND @IdTrabajador=@IdTrabajador
END
GO
IF OBJECT_ID('USP_GET_PRODUCTO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTO_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PRODUCTO_PROVEEDOR(
	@IdProductoProveedor INT
)
AS BEGIN
	SELECT IdProductoProveedor,IdProducto,IdProveedor,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,Costo,Habilitado FROM PRODUCTO_PROVEEDOR WHERE IdProductoProveedor =@IdProductoProveedor
END
GO
IF OBJECT_ID('UFN_CHECK_ESTADO_EMPAQUE','FN') IS NOT NULL
	DROP FUNCTION UFN_CHECK_ESTADO_EMPAQUE
GO
CREATE FUNCTION UFN_CHECK_ESTADO_EMPAQUE(
	@IdProductoProveedor INT,
	@Cantidad INT
)
RETURNS INT
AS
BEGIN
	DECLARE @CANTIDAD_ESPERADA INT;
	DECLARE @RETORNO INT;
	SELECT @CANTIDAD_ESPERADA =CantidadEmpaque FROM PRODUCTO_PROVEEDOR WHERE IdProductoProveedor = @IdProductoProveedor;
	IF @CANTIDAD_ESPERADA = NULL
		SET @RETORNO= 3;
	ELSE IF @CANTIDAD_ESPERADA = @Cantidad
		SET @RETORNO = 1;
	ELSE
		SET @RETORNO= 2;
	RETURN @RETORNO;
END
GO
IF OBJECT_ID('USP_UPDATE_SUCURSAL',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_SUCURSAL
GO
CREATE PROCEDURE [dbo].USP_UPDATE_SUCURSAL(
	@IdSucursal			INT,
    @NombreSucursal		NVARCHAR(100) ,
    @Direccion			NVARCHAR(250) ,
	@Telefono1			NVARCHAR(20) ,
	@Telefono2			NVARCHAR(20) NULL
) AS BEGIN
	UPDATE SUCURSAL SET NombreSucursal=@NombreSucursal,Direccion=@Direccion,
    Telefono1 = @Telefono1,Telefono2 = ISNULL(@Telefono2, Telefono2), UpdateAt=GETDATE() 
	WHERE IdSucursal = @IdSucursal;
END 
