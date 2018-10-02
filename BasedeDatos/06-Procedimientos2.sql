USE pruebas_node;
GO
IF OBJECT_ID('USP_CREATE_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_PRODUCTO
GO
CREATE PROCEDURE USP_CREATE_PRODUCTO(
	@IdProveedor		INT,
    @IdSubClasificacion INT,
    @IdEstado			INT,
    @NombreProducto		NVARCHAR(50),
    @Descripcion		NVARCHAR(200),
    @Imagen				NVARCHAR(100),
	@IdEnvase			INT,
	@IdEmpaque			INT,
	@IdUnidadMedida		INT,
	@ValorUnidadMedida	NUMERIC(10,5),
	@CantidadEmpaque	INT, 
	@DiasRotacion		INT,
	@TipoInsumo			INT,
	@CodigoProducto		NVARCHAR(200),
	@CodigoInterno		NVARCHAR(200),
	@CodigoBarra		NVARCHAR(200)

) AS BEGIN
	IF EXISTS (SELECT NombreProducto FROM dbo.PRODUCTO WHERE IdProveedor = @IdProveedor 
				AND @NombreProducto = NombreProducto AND IdEnvase = @IdEnvase 
				AND IdUnidadMedida = @IdUnidadMedida AND ValorUnidadMedida = @ValorUnidadMedida)
	BEGIN
		RAISERROR('Ya existe un Producto con las mismas caracteristicas que "%s"',16,1,@NombreProducto)
		RETURN	
	END
		
	IF EXISTS (SELECT CodigoProducto FROM dbo.PRODUCTO WHERE CodigoProducto = @CodigoProducto)
	BEGIN
		RAISERROR('Ya existe un Producto con el mismo codigo ingresado',16,1)
		RETURN	
	END
	
	
		--BEGIN TRANSACTION
		--BEGIN TRY
			INSERT INTO dbo.PRODUCTO(
			IdProveedor
			, IdSubClasificacion
			, IdEstado,NombreProducto
			, Descripcion,Imagen
			, IdEnvase,IdEmpaque
			, IdUnidadMedida
			, ValorUnidadMedida
			, CantidadEmpaque
			, DiasRotacion
			, TipoInsumo
			, CodigoProducto
			, CodigoInterno
			, CodigoBarra
			)
			VALUES(
			@IdProveedor
			, @IdSubClasificacion
			, @IdEstado
			, @NombreProducto
			, @Descripcion
			, @Imagen
			, @IdEnvase
			, @IdEmpaque
			, @IdUnidadMedida
			, @ValorUnidadMedida
			, @CantidadEmpaque
			, @DiasRotacion
			, @TipoInsumo
			, @CodigoProducto
			, @CodigoInterno
			, @CodigoBarra
			)
			SELECT @@IDENTITY AS IdProducto
		--	COMMIT TRANSACTION
		--END TRY
		--BEGIN CATCH
		--	ROLLBACK TRANSACTION
		--	THROW;
		--END CATCH

END 
GO
IF OBJECT_ID('USP_UPDATE_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PRODUCTO
GO
CREATE PROCEDURE USP_UPDATE_PRODUCTO(
	@IdProducto			INT,
    @IdCategoria		INT,
    @IdSubClasificacion INT,
    @IdEstado			INT,
    @NombreProducto		NVARCHAR(50),
    @Descripcion		NVARCHAR(200),
    @Imagen				NVARCHAR(100) NULL,
	@IdEnvase			INT	NULL,
	@IdEmpaque			INT	NULL,
	@IdUnidadMedida		INT,
	@ValorUnidadMedida	INT,
	@CantidadEmpaque	INT,
	@DiasRotacion		INT,
	@TipoInsumo			INT,
	@CodigoProducto		NVARCHAR(200),
	@CodigoInterno		NVARCHAR(200),
	@CodigoBarra		NVARCHAR(200)

) AS BEGIN 
	UPDATE dbo.PRODUCTO 
	SET IdSubClasificacion= ISNULL(@IdSubClasificacion,IdSubClasificacion)
		,	IdEstado = @IdEstado
		,	NombreProducto = @NombreProducto
		,	cantidadEmpaque = @CantidadEmpaque
		,   Descripcion	= @Descripcion
		,	Imagen = @Imagen
		,	IdEnvase = @IdEnvase
		,	IdEmpaque = @IdEmpaque
		,	IdUnidadMedida = @IdUnidadMedida
		,	ValorUnidadMedida = @ValorUnidadMedida
		,   DiasRotacion = ISNULL(@DiasRotacion, DiasRotacion)
		,	TipoInsumo = @TipoInsumo
		,	CodigoProducto = @CodigoProducto
		,	CodigoInterno = @CodigoInterno
		,   CodigoBarra = @CodigoBarra
		,	UpdateAt	= GETDATE()
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
	SELECT P.IdProducto
			, P.IdProveedor
			, C.IdCategoria
			, C.IdClasificacion
			, P.IdSubClasificacion
			, P.IdEstado
			, P.IdEnvase
			, P.IdEmpaque
			, P.IdUnidadMedida
			, P.ValorUnidadMedida
			, P.CantidadEmpaque
			, P.DiasRotacion
			, P.TipoInsumo
			, P.CodigoProducto
			, P.CodigoInterno
			, P.CodigoBarra
			, P.NombreProducto
			, P.Descripcion
			, P.Imagen
			, P.Habilitado
			, P.CreatedAt
			, P.UpdateAt 
	FROM dbo.PRODUCTO P
	INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC 
		ON P.IdSubClasificacion = SC.IdSubClasificacion
	INNER JOIN dbo.CLASIFICACION_PRODUCTO C 
		ON SC.IdClasificacion = C.IdClasificacion
	INNER JOIN dbo.CATEGORIA_PRODUCTO CP 
		ON C.IdCategoria = CP.IdCategoria
	INNER JOIN dbo.PROVEEDOR PRO
		ON P.IdProveedor = PRO.IdProveedor
	 WHERE IdProducto = @IdProducto
END
GO
IF OBJECT_ID('USP_GET_PRODUCTOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS
GO
CREATE PROCEDURE USP_GET_PRODUCTOS
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado is NULL
	BEGIN
		SELECT IdProducto
		, PRO.IdProveedor
		, C.IdCategoria
		, CP.NombreCategoria
		, P.IdSubClasificacion
		, SC.NombreSubClasificacion
		, C.IdClasificacion
		, C.NombreClasificacion
		, p.IdEstado
		, p.NombreProducto
		, p.Descripcion
		, p.Imagen
		, P.DiasRotacion
		, P.TipoInsumo
		, P.CodigoProducto
		, P.CodigoInterno
		, P.CodigoBarra
		, P.Habilitado
		, P.CreatedAt
		, P.UpdateAt 
		FROM dbo.PRODUCTO P
		INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC 
			ON P.IdSubClasificacion = SC.IdSubClasificacion
		INNER JOIN dbo.CLASIFICACION_PRODUCTO C 
			ON SC.IdClasificacion = C.IdClasificacion
		INNER JOIN dbo.CATEGORIA_PRODUCTO CP 
			ON C.IdCategoria = CP.IdCategoria
		INNER JOIN dbo.PROVEEDOR PRO
			ON P.IdProveedor = PRO.IdProveedor

	END
	ELSE
	BEGIN
		SELECT IdProducto
		, PRO.IdProveedor
		, C.IdCategoria
		, CP.NombreCategoria
		, P.IdSubClasificacion
		, SC.NombreSubClasificacion
		, C.IdClasificacion
		, C.NombreClasificacion
		, P.IdEstado
		, P.NombreProducto
		, P.Descripcion
		, P.Imagen
		, P.DiasRotacion
		, P.Habilitado
		, P.CreatedAt
		, P.UpdateAt 
		FROM dbo.PRODUCTO P
		INNER JOIN dbo.SUBCLASIFICACION_PRODUCTO SC 
			ON P.IdSubClasificacion = SC.IdSubClasificacion
		INNER JOIN dbo.CLASIFICACION_PRODUCTO C 
			ON SC.IdClasificacion = C.IdClasificacion
		INNER JOIN dbo.CATEGORIA_PRODUCTO CP 
			ON C.IdCategoria = CP.IdCategoria
		INNER JOIN dbo.PROVEEDOR PRO
			ON P.IdProveedor = PRO.IdProveedor
		WHERE P.Habilitado = @Habilitado
	END
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
		SELECT	VPD.*
				, PVE.NombreProveedor
				, Cantidad = 1
				, Descuento = 0
				, GravadoIva = 0 
		FROM	dbo.V_ProductosDetallados VPD
				INNER JOIN dbo.PROVEEDOR PVE
					ON VPD.IdProveedor = PVE.IdProveedor
	ELSE
		SELECT VPD.*
				, Cantidad = 1
				, Descuento = 0
				, GravadoIva = 0 
		FROM	dbo.V_ProductosDetallados VPD
				INNER JOIN dbo.PROVEEDOR PVE
					ON VPD.IdProveedor = PVE.IdProveedor
		WHERE	VPD.Habilitado = @Habilitado;
END 
GO

--IF OBJECT_ID('USP_GET_PRODUCTO_PROVEEDORES','P') IS NOT NULL
--	DROP PROCEDURE USP_GET_PRODUCTO_PROVEEDORES
--GO
--CREATE PROCEDURE USP_GET_PRODUCTO_PROVEEDORES(
--	@IdProducto INT
--) AS BEGIN
--	SELECT PRO.* FROM dbo.PROVEEDOR PRO
--	INNER JOIN dbo.PRODUCTO_PROVEEDOR PP
--	ON PRO.IdProveedor = PP.IdProveedor
--	WHERE PP.IdProducto = @IdProducto;
--END
--GO
IF OBJECT_ID('USP_GET_PRODUCTOS_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PRODUCTOS_PROVEEDOR(
	@IdProveedor INT
) AS BEGIN
	SELECT	VPD.*
			, PVE.NombreProveedor
	FROM	dbo.V_ProductosDetallados VPD
		INNER JOIN PROVEEDOR PVE
			ON	VPD.IdProveedor = PVE.IdProveedor
	WHERE VPD.IdProveedor = @IdProveedor;
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
		BEGIN
			SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado 
				FROM dbo.EMPAQUE
		END
	ELSE
		BEGIN
			SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM dbo.EMPAQUE 
			WHERE Habilitado = @Habilitado;
		END
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
		BEGIN
			SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado 
			FROM dbo.ENVASE
		END
	ELSE
		BEGIN
			SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado FROM dbo.ENVASE 
			WHERE Habilitado = @Habilitado;
		END
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
CREATE PROCEDURE USP_GET_UNIDADES_DE_MEDIDA (
	@Habilitado				BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		BEGIN
			SELECT  UNIDAD.IdUnidadMedida
					, UNIDAD.IdClasificacionUnidadMedida
					, CLAUDM.NombreClasificacion
					, UNIDAD.NombreUnidad
					, UNIDAD.Simbolo
					, UNIDAD.Habilitado
					, UNIDAD.NImportancia 
			FROM	dbo.UNIDAD_MEDIDA UNIDAD 
					INNER JOIN dbo.CLASIFICACION_UNIDAD_MEDIDA CLAUDM
			ON		UNIDAD.IdClasificacionUnidadMedida = CLAUDM.IdClasificacionUnidadMedida
			ORDER BY UNIDAD.NImportancia DESC
		END
	ELSE
		BEGIN
			SELECT  UNIDAD.IdUnidadMedida
					, UNIDAD.IdClasificacionUnidadMedida
					, CLAUDM.NombreClasificacion
					, UNIDAD.NombreUnidad
					, UNIDAD.Simbolo
					, UNIDAD.Habilitado
					, UNIDAD.NImportancia 
			FROM	dbo.UNIDAD_MEDIDA UNIDAD 
					INNER JOIN dbo.CLASIFICACION_UNIDAD_MEDIDA CLAUDM
			ON		UNIDAD.IdClasificacionUnidadMedida = CLAUDM.IdClasificacionUnidadMedida
			WHERE UNIDAD.Habilitado = @Habilitado 
			ORDER BY UNIDAD.NImportancia DESC
		END
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
		SELECT IdSucursal,NombreSucursal,Direccion, Telefono1, Telefono2,Habilitado from dbo.SUCURSAL
	ELSE
		SELECT IdSucursal,NombreSucursal,Direccion, Telefono1, Telefono2, Habilitado from dbo.SUCURSAL WHERE Habilitado = @Habilitado
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
--IF OBJECT_ID('USP_CREATE_PRODUCTO_PROVEEDOR','P') IS NOT NULL
--	DROP PROCEDURE USP_CREATE_PRODUCTO_PROVEEDOR
--GO
--CREATE PROCEDURE USP_CREATE_PRODUCTO_PROVEEDOR(
--	@IdProducto		INT,
--	@IdProveedor	INT
--) AS BEGIN

--	IF NOT EXISTS(SELECT IdProductoProveedor FROM dbo.PRODUCTO_PROVEEDOR WHERE IdProducto = @IdProducto AND IdProveedor = @IdProveedor AND Habilitado = 1)
--	BEGIN
--		BEGIN TRANSACTION miTran;
--		BEGIN TRY
--			IF NOT EXISTS(SELECT IdProveedor FROM PROVEEDOR WHERE IdProveedor = @IdProveedor) BEGIN
--			RAISERROR('El proveedor Seleccionado no existe',16,1)
--			END
--		IF NOT EXISTS(SELECT IdProducto FROM dbo.PRODUCTO WHERE IdProducto  = @IdProducto) BEGIN
--			RAISERROR('El producto seleccionado no existe.',16,2)
--		END
--			INSERT INTO dbo.PRODUCTO_PROVEEDOR(IdProducto,IdProveedor)
--			VALUES(@IdProducto,@IdProveedor)
--			SELECT @@IDENTITY AS IdProductoProveedor
--			COMMIT TRANSACTION miTran
--		END TRY
--		BEGIN CATCH
--			ROLLBACK TRANSACTION miTran;
--			THROW;
--		END CATCH
--	END
--	ELSE BEGIN
--		RAISERROR('Ya existe una relacion Producto Proveedor Activa.',16,3)
--	END
--END 
--GO
--IF OBJECT_ID('USP_DISP_PRODUCTO_PROVEEDOR','P') IS NOT NULL
--	DROP PROCEDURE USP_DISP_PRODUCTO_PROVEEDOR
--GO
--CREATE PROCEDURE USP_DISP_PRODUCTO_PROVEEDOR(
--	@IdProductoProveedor INT,
--	@Habilitado BIT
--) AS BEGIN
--	UPDATE dbo.PRODUCTO_PROVEEDOR set Habilitado = @Habilitado,UpdateAt=GETDATE() Where IdProductoProveedor = @IdProductoProveedor;
--END 
--GO
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
IF OBJECT_ID('USP_GET_PRODUCTO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTO_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PRODUCTO_PROVEEDOR(
	@IdProveedor INT
)
AS BEGIN
	SELECT 
		PRO.IdProducto
		, PVE.IdProveedor
		, PRO.IdEnvase
		, PRO.IdEmpaque
		, PRO.IdUnidadMedida
		, PRO.ValorUnidadMedida
		, PRO.CantidadEmpaque
		, PRO.Habilitado 
	FROM dbo.PRODUCTO PRO
	INNER JOIN dbo.PROVEEDOR PVE
		ON PRO.IdProveedor = PVE.IdProveedor
	WHERE PRO.IdProveedor = @IdProveedor
END
GO
IF OBJECT_ID('UFN_CHECK_ESTADO_EMPAQUE','FN') IS NOT NULL
	DROP FUNCTION UFN_CHECK_ESTADO_EMPAQUE
GO
CREATE FUNCTION UFN_CHECK_ESTADO_EMPAQUE(
	@IdProducto INT,
	@Cantidad INT
)
RETURNS INT
AS
BEGIN
	DECLARE @CANTIDAD_ESPERADA INT;
	DECLARE @RETORNO INT;
	SELECT @CANTIDAD_ESPERADA = CantidadEmpaque 
	FROM dbo.PRODUCTO 
		WHERE IdProducto = @IdProducto;
	IF @CANTIDAD_ESPERADA = NULL
		SET @RETORNO= 3;
	ELSE IF @CANTIDAD_ESPERADA = @Cantidad
		SET @RETORNO = 1;
	ELSE
		SET @RETORNO= 2;
	RETURN @RETORNO;
END
GO
IF OBJECT_ID('dbo.USP_UPDATE_SUCURSAL',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_SUCURSAL
GO
CREATE PROCEDURE [dbo].USP_UPDATE_SUCURSAL(
	@IdSucursal			INT,
    @NombreSucursal		NVARCHAR(100) ,
    @Direccion			NVARCHAR(250) ,
	@Telefono1			NVARCHAR(20) ,
	@Telefono2			NVARCHAR(20) NULL
) AS BEGIN
	UPDATE dbo.SUCURSAL SET NombreSucursal=@NombreSucursal,Direccion=@Direccion,
    Telefono1 = @Telefono1,Telefono2 = ISNULL(@Telefono2, Telefono2), UpdateAt=GETDATE() 
	WHERE IdSucursal = @IdSucursal;
END 
GO
IF OBJECT_ID('dbo.USP_DISP_SUCURSAL',N'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_SUCURSAL
GO
CREATE PROCEDURE dbo.USP_DISP_SUCURSAL(
	@IdSucursal			INT,
	@Habilitado			BIT
) AS BEGIN
	UPDATE dbo.SUCURSAL SET Habilitado = @Habilitado, UpdateAt = GETDATE() WHERE IdSucursal = @IdSucursal
END