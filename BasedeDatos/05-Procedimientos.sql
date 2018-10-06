use pruebas_node;
go
IF OBJECT_ID('USP_CREATE_CATEGORIA','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CATEGORIA
GO
CREATE PROCEDURE USP_CREATE_CATEGORIA(
	@NombreCategoria NVARCHAR(50),
    @DescripcionCategoria NVARCHAR(150) 
) 
AS 
BEGIN
	IF EXISTS(SELECT * FROM CATEGORIA_PRODUCTO where NombreCategoria = @NombreCategoria) 
		RAISERROR('Nombre de Categoria duplicado.',16,1)
	ELSE
		BEGIN
			INSERT INTO CATEGORIA_PRODUCTO(NombreCategoria,DescripcionCategoria)
			VALUES(@NombreCategoria,@DescripcionCategoria);
			SELECT @@IDENTITY AS IdCategoria
		END
END
GO
IF OBJECT_ID('USP_GET_CATEGORIAS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CATEGORIAS
GO
CREATE PROCEDURE USP_GET_CATEGORIAS
	@Habilitado BIT NULL
AS 
BEGIN
	IF @Habilitado IS NULL
		SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado,CreatedAt,UpdateAt FROM CATEGORIA_PRODUCTO;
	ELSE
		SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado,CreatedAt,UpdateAt FROM CATEGORIA_PRODUCTO
		WHERE Habilitado = @Habilitado
END
GO
IF	OBJECT_ID('USP_UPDATE_CATEGORIA','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CATEGORIA
GO
CREATE PROCEDURE USP_UPDATE_CATEGORIA(
	@IdCategoria INT,
    @NombreCategoria NVARCHAR(50),
    @DescripcionCategoria NVARCHAR(150)
)
AS 
BEGIN
	UPDATE CATEGORIA_PRODUCTO SET NombreCategoria = @NombreCategoria,DescripcionCategoria = @DescripcionCategoria,UpdateAt=GETDATE() WHERE IdCategoria = @IdCategoria;
END
GO
IF OBJECT_ID('dbo.USP_DISP_CATEGORIA','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISP_CATEGORIA
GO
CREATE PROCEDURE dbo.USP_DISP_CATEGORIA (
	@IdCategoria	INT,
	@Habilitado		BIT
)
AS BEGIN
	UPDATE dbo.CATEGORIA_PRODUCTO
	SET Habilitado = @Habilitado, UpdateAt = GETDATE()
	WHERE IdCategoria = @IdCategoria
END
GO
IF OBJECT_ID('USP_GET_CATEGORIA_BY_ID','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CATEGORIA_BY_ID
GO
CREATE PROCEDURE USP_GET_CATEGORIA_BY_ID(
	@IdCategoria INT
) AS BEGIN
	SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado FROM CATEGORIA_PRODUCTO WHERE IdCategoria = @IdCategoria;
END 
GO

IF OBJECT_ID('USP_GET_CLASIFICACIONES_BY_ID_CATEGORIA','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACIONES_BY_ID_CATEGORIA
GO
CREATE PROCEDURE USP_GET_CLASIFICACIONES_BY_ID_CATEGORIA(
	@IdCategoria INT
	, @Habilitado BIT 
) AS BEGIN
	SELECT	*
	FROM	dbo.CATEGORIA_PRODUCTO CAT
			INNER JOIN	CLASIFICACION_PRODUCTO CLASI
				ON CAT.IdCategoria = CLASI.IdCategoria
	WHERE	@IdCategoria = CAT.IdCategoria
			AND @Habilitado = CAT.Habilitado
END 
GO

IF OBJECT_ID('USP_GET_CATEGORIA_BY_NOMBRE','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CATEGORIA_BY_NOMBRE
GO
CREATE PROCEDURE USP_GET_CATEGORIA_BY_NOMBRE(
	@Nombre INT
) AS BEGIN
	SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado FROM CATEGORIA_PRODUCTO WHERE NombreCategoria = @Nombre;
END 
GO
IF OBJECT_ID('USP_CREATE_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CLASIFICACION
GO
CREATE PROCEDURE USP_CREATE_CLASIFICACION(
	@IdCategoria				INT,
	@NombreClasificacion		NVARCHAR(50),
    @DescripcionClasificacion	NVARCHAR(150)
) AS BEGIN
	IF EXISTS(SELECT * from dbo.CLASIFICACION_PRODUCTO where NombreClasificacion = @NombreClasificacion) 
		BEGIN
 		RAISERROR('Ya existe una Clasificacion con este nombre.',16,1)
 		END
	ELSE
	BEGIN
		INSERT INTO dbo.CLASIFICACION_PRODUCTO(IdCategoria,NombreClasificacion,DescripcionClasificacion)
		VALUES(@IdCategoria, @NombreClasificacion, @DescripcionClasificacion);		
		SELECT @@IDENTITY AS IdClasificacion
     END
END 
GO
IF OBJECT_ID('USP_GET_CLASIFICACIONES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACIONES
GO
CREATE PROCEDURE USP_GET_CLASIFICACIONES
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado IS NULL
		BEGIN
			SELECT	CLASI.IdCategoria
					, CLASI.IdClasificacion
					, CLASI.NombreClasificacion
					, CLASI.DescripcionClasificacion
					, CLASI.Habilitado 
					, CATE.NombreCategoria
			FROM	dbo.CLASIFICACION_PRODUCTO CLASI
					INNER JOIN dbo.CATEGORIA_PRODUCTO CATE
			ON		CLASI.IdCategoria = CATE.IdCategoria
		END
	ELSE
		BEGIN
			SELECT	CLASI.IdCategoria
					, CLASI.IdClasificacion
					, CLASI.NombreClasificacion
					, CLASI.DescripcionClasificacion
					, CLASI.Habilitado 
					, CATE.NombreCategoria
			FROM	dbo.CLASIFICACION_PRODUCTO CLASI
					INNER JOIN dbo.CATEGORIA_PRODUCTO CATE
			ON		CLASI.IdCategoria = CATE.IdCategoria
			WHERE CLASI.Habilitado= @Habilitado
		END
END
GO
IF OBJECT_ID('USP_UPDATE_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CLASIFICACION
GO
CREATE PROCEDURE USP_UPDATE_CLASIFICACION(
	@IdCategoria			INT,
	@IdClasificacion		INT,
	@NombreClasificacion	NVARCHAR(50),
    @DescripcionClasificacion NVARCHAR(150)
) 
AS BEGIN
	IF COALESCE(@IdCategoria, @NombreClasificacion, @DescripcionClasificacion) IS NOT NULL
		BEGIN
			UPDATE dbo.CLASIFICACION_PRODUCTO
			SET IdCategoria = ISNULL(@IdCategoria,IdCategoria), NombreClasificacion = ISNULL(@NombreClasificacion,NombreClasificacion),DescripcionClasificacion  = @DescripcionClasificacion,
				UpdateAt=GETDATE() 
				WHERE IdClasificacion = @IdClasificacion;
		END
END
GO
IF OBJECT_ID('USP_DISP_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_CLASIFICACION
GO
--Nombre anterior USP_DispClasificaion
CREATE PROCEDURE USP_DISP_CLASIFICACION(
	@IdClasificacion INT,
	@Habilitado BIT
) AS BEGIN 
	UPDATE dbo.CLASIFICACION_PRODUCTO SET Habilitado = @Habilitado,UpdateAt=GETDATE() WHERE IdClasificacion = @IdClasificacion;
END 
GO
IF OBJECT_ID('USP_GET_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACION
GO
--Nombre anterior GetClasificacion
CREATE PROCEDURE USP_GET_CLASIFICACION(
	@IdClasificacion INT
) AS BEGIN 
	SELECT IdCategoria,IdClasificacion,NombreClasificacion,DescripcionClasificacion,Habilitado 
		FROM dbo.CLASIFICACION_PRODUCTO WHERE IdClasificacion = @IdClasificacion;
END
GO
IF OBJECT_ID('USP_CREATE_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_SUBCLASIFICACION
GO
CREATE PROCEDURE USP_CREATE_SUBCLASIFICACION(
	@IdClasificacion				INT,
    @NombreSubClasificacion			NVARCHAR(50),
    @DescripcionSubClasificacion	NVARCHAR(150)
) AS BEGIN
	IF NOT EXISTS(SELECT * FROM dbo.CLASIFICACION_PRODUCTO where IdClasificacion = @IdClasificacion)
		RAISERROR('La Clasificacion Seleccionada no se encontro, por lo tanto no se inserto la Subclasificacion.',16,1);
    ELSE
		BEGIN
			INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombreSubClasificacion,DescripcionSubclasificacion)
			VALUES(@IdClasificacion,@NombreSubClasificacion,@DescripcionSubClasificacion);
			SELECT @@IDENTITY AS IdSubClasificacion
		END
END
GO
IF OBJECT_ID('USP_UPDATE_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_SUBCLASIFICACION
GO
CREATE PROCEDURE USP_UPDATE_SUBCLASIFICACION(
	@IdSubClasificacion					INT,
    @IdClasificacion					INT NULL,
	@NombreSubClasificacion				NVARCHAR(50)  NULL,
    @DescripcionSubClasificacion		NVARCHAR(150) NULL
) AS BEGIN
	IF COALESCE(@IdSubClasificacion, @NombreSubClasificacion, @DescripcionSubClasificacion) IS NOT NULL
		BEGIN
			UPDATE SUBCLASIFICACION_PRODUCTO
			SET IdClasificacion= ISNULL(@IdClasificacion,IdClasificacion)
			,NombreSubClasificacion = ISNULL(@NombreSubClasificacion, NombreSubClasificacion),DescripcionSubClasificacion  = ISNULL(@DescripcionSubClasificacion,DescripcionSubclasificacion),UpdateAt=GETDATE() 
			WHERE IdSubClasificacion = @IdSubClasificacion;
		END
END 
GO
IF OBJECT_ID('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION
GO
CREATE PROCEDURE USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION(
	@IdClasificacion INT
)
AS BEGIN
	SELECT s.IdSubClasificacion
			, s.NombreSubClasificacion
			, s.DescripcionSubClasificacion
			, s.IdClasificacion
			, c.NombreClasificacion
			, s.Habilitado
			, s.CreatedAt
			, s.UpdateAt 
	FROM	SUBCLASIFICACION_PRODUCTO s
			INNER JOIN dbo.CLASIFICACION_PRODUCTO c 
				ON s.IdClasificacion = c.IdClasificacion 
	WHERE s.IdClasificacion = @IdClasificacion;
END
GO
IF OBJECT_ID('USP_GET_SUBCLASIFICACIONES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUBCLASIFICACIONES
GO
--Nombre anterios USP_ListSubClasificaciones 
CREATE PROCEDURE USP_GET_SUBCLASIFICACIONES 
	@Habilitado BIT  NULL
AS BEGIN
	IF @Habilitado IS NULL
	BEGIN
		SELECT	s.IdSubClasificacion,
				s.NombreSubClasificacion,
				s.DescripcionSubClasificacion,
				s.IdClasificacion,
				c.NombreClasificacion,
				s.Habilitado,
				s.CreatedAt,
				s.UpdateAt FROM SUBCLASIFICACION_PRODUCTO s
			INNER JOIN dbo.CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion
	END
	ELSE
		BEGIN
			SELECT	s.IdSubClasificacion,
				s.NombreSubClasificacion,
				s.DescripcionSubClasificacion,
				s.IdClasificacion,
				c.NombreClasificacion,
				s.Habilitado,
				s.CreatedAt,
				s.UpdateAt FROM SUBCLASIFICACION_PRODUCTO s
			INNER JOIN dbo.CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion WHERE c.Habilitado = @Habilitado
		END
END
GO
IF OBJECT_ID('USP_DISP_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_SUBCLASIFICACION
GO
--Nombre anterior USP_DispSubClasificaion
CREATE PROCEDURE USP_DISP_SUBCLASIFICACION(
	@IdSubClasificacion INT,
	@Habilitado BIT
) AS BEGIN 
	UPDATE SUBCLASIFICACION_PRODUCTO SET Habilitado = @Habilitado, UpdateAt=GETDATE() WHERE IdSubClasificacion = @IdSubClasificacion;
END 
GO
IF OBJECT_ID('USP_GET_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUBCLASIFICACION
GO
--Nombre anterior GetSubClasificacion
CREATE PROCEDURE USP_GET_SUBCLASIFICACION(
	@IdSubClasificacion INT
) AS BEGIN 
	SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado,s.CreatedAt,s.UpdateAt 
	FROM SUBCLASIFICACION_PRODUCTO s INNER JOIN dbo.CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion 
	WHERE IdSubClasificacion=@IdSubClasificacion;
END
GO
IF OBJECT_ID('USP_CREATE_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_PROVEEDOR
GO
CREATE PROCEDURE USP_CREATE_PROVEEDOR(
	@NombreProveedor	NVARCHAR(50), -- NOT NULL,
    @Direccion			NVARCHAR(200),-- NOT NULL,
    @Email				NVARCHAR(100),-- NULL
    @Descripcion		NVARCHAR(200),-- NULL,
    @NombreRepresentante NVARCHAR(100), -- NOT NULL,
	@Documento			NVARCHAR(20), --Por defecto sera el numero ruc
	@Telefono1			NVARCHAR(20),
	@Telefono2			NVARCHAR(20) NULL,
	@Retencion2			BIT NULL,
	@Mercado			BIT NULL
) AS BEGIN
	BEGIN TRANSACTION myTran
	BEGIN TRY

		IF EXISTS (SELECT NombreProveedor FROM PROVEEDOR WHERE NombreProveedor = @NombreProveedor)
		BEGIN
			RAISERROR('El nombre del proveedor ya existe.',16,1);
			RETURN
		END

		IF EXISTS (SELECT Documento FROM PROVEEDOR WHERE Documento = @Documento)
		BEGIN
			RAISERROR('El Numero Ruc del proveedor ya existe.',16,1);
			RETURN
		END

		IF (@Documento IS NULL AND @Mercado = 0)
		BEGIN
			RAISERROR('El Numero Ruc ES requerido.',16,1);
			RETURN
		END

		INSERT INTO PROVEEDOR(NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante,Documento,Retencion2,Mercado)
		VALUES(@NombreProveedor,@Direccion,@Email,@Descripcion,@NombreRepresentante,@Documento,@Retencion2,@Mercado);
		SELECT @@IDENTITY AS IdProveedor
		COMMIT TRANSACTION myTran;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION myTran;
		THROW;
	END CATCH
END 
GO
IF OBJECT_ID('USP_UPDATE_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PROVEEDOR
GO
CREATE PROCEDURE USP_UPDATE_PROVEEDOR(
	@IdProveedor	INT,
    @NombreProveedor NVARCHAR(50), -- NOT NULL,
    @Direccion		NVARCHAR(200),-- NOT NULL,
    @Email			NVARCHAR(100),-- NULL
    @Descripcion	NVARCHAR(200),-- NULL,
    @NombreRepresentante NVARCHAR(100) NULL, -- NOT NULL,
	@Documento		NVARCHAR(20),
	@Telefono1		NVARCHAR(20), 
	@Telefono2		NVARCHAR(20),
	@Retencion2		BIT NULL,
	@Mercado		BIT NULL
) AS BEGIN
	UPDATE dbo.	PROVEEDOR SET NombreProveedor=@NombreProveedor,Direccion=@Direccion,Email=@Email,Descripcion=@Descripcion,
					NombreRepresentante=ISNULL(@NombreRepresentante, NombreRepresentante),
					Retencion2 = ISNULL(@Retencion2, Retencion2),Documento=ISNULL(@Documento,Documento),
					UpdateAt=GETDATE() , Mercado = ISNULL(@Mercado, Mercado)
					WHERE IdProveedor = @IdProveedor;
END 
GO
IF OBJECT_ID('USP_DISP_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_PROVEEDOR
GO
CREATE PROCEDURE USP_DISP_PROVEEDOR(
	@IdProveedor	INT,
	@Habilitado		BIT
) AS BEGIN 
	UPDATE dbo.PROVEEDOR SET Habilitado = @Habilitado, UpdateAt=GETDATE() 
	WHERE IdProveedor = @IdProveedor;
END
GO
IF OBJECT_ID('USP_GET_PROVEEDORES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PROVEEDORES
GO
CREATE PROCEDURE USP_GET_PROVEEDORES
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado IS NULL
		BEGIN
			SELECT IdProveedor
				, NombreProveedor
				, Direccion
				, Email
				, Descripcion
				, NombreRepresentante
				, Documento
				, Retencion2 
				, Mercado
			FROM	dbo.PROVEEDOR;
		END
	ELSE
		BEGIN
			SELECT IdProveedor
				, NombreProveedor
				, Direccion
				, Email
				, Descripcion
				, NombreRepresentante
				, Documento
				, Retencion2 
				, Mercado
			FROM	dbo.PROVEEDOR
			WHERE Habilitado = @Habilitado;
		END
END
GO
IF OBJECT_ID('USP_GET_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PROVEEDOR(
	@IdProveedor INT
) AS BEGIN 
	SELECT IdProveedor
		, NombreProveedor
		, Direccion
		, Email
		, Descripcion
		, NombreRepresentante
		, IdTipoDocumento
		, Documento
		, Retencion2
		, Mercado 
	FROM	dbo.PROVEEDOR
	WHERE IdProveedor = @IdProveedor;
END
GO
IF OBJECT_ID('UFN_CHECK_ESTADO_EMPAQUE','FN') IS NOT NULL
	DROP FUNCTION UFN_CHECK_ESTADO_EMPAQUE
GO
CREATE FUNCTION UFN_CHECK_ESTADO_EMPAQUE(
	@IdProducto		INT,
	@Cantidad		INT
)
RETURNS INT
AS
BEGIN
	DECLARE @CANTIDAD_ESPERADA INT;
	DECLARE @RETORNO INT;
	SELECT @CANTIDAD_ESPERADA = CantidadEmpaque FROM PRODUCTO WHERE IdProducto= @IdProducto;
	IF @CANTIDAD_ESPERADA = NULL
		SET @RETORNO	= 3;
	ELSE IF @CANTIDAD_ESPERADA = @Cantidad
		SET @RETORNO	= 1;
	ELSE
		SET @RETORNO	= 2;
	RETURN @RETORNO;
END