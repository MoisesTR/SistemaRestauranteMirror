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
AS 
BEGIN
	SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado FROM CATEGORIA_PRODUCTO;
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
IF OBJECT_ID('USP_GET_CATEGORIA_BY_ID','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CATEGORIA_BY_ID
GO
CREATE PROCEDURE USP_GET_CATEGORIA_BY_ID(
	@IdCategoria INT
) AS BEGIN
	SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado FROM CATEGORIA_PRODUCTO WHERE IdCategoria = @IdCategoria;
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
	@NombreClasificacion NVARCHAR(50),
    @DescripcionClasificacion NVARCHAR(150)
) AS BEGIN
	IF EXISTS(SELECT * from CLASIFICACION_PRODUCTO where NombreClasificacion = @NombreClasificacion) 
		BEGIN
 		RAISERROR('Clasificacion Duplicada, No se inserto.',16,1)
 		END
	ELSE
	BEGIN
		INSERT INTO CLASIFICACION_PRODUCTO(NombreClasificacion,DescripcionClasificacion)
		VALUES(@NombreClasificacion,@DescripcionClasificacion);		
		SELECT @@IDENTITY AS IdClasificacion
     END
END 
GO
IF OBJECT_ID('USP_GET_CLASIFICACIONES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACIONES
GO
CREATE PROCEDURE USP_GET_CLASIFICACIONES
AS BEGIN
	SELECT IdClasificacion,NombreClasificacion,DescripcionClasificacion,Habilitado FROM CLASIFICACION_PRODUCTO;
END
GO
IF OBJECT_ID('USP_UPDATE_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CLASIFICACION
GO
CREATE PROCEDURE USP_UPDATE_CLASIFICACION(
	@IdClasificacion int,
	@NombreClasificacion NVARCHAR(50),
    @DescripcionClasificacion NVARCHAR(150)
	--,@Habilitado BIT
) 
AS BEGIN
	UPDATE CLASIFICACION_PRODUCTO
    SET NombreClasificacion = @NombreClasificacion,DescripcionClasificacion  = @DescripcionClasificacion,UpdateAt=GETDATE() where IdClasificacion = @IdClasificacion;
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
	UPDATE CLASIFICACION_PRODUCTO SET Habilitado = @Habilitado,UpdateAt=GETDATE() WHERE IdClasificacion = @IdClasificacion;
END 
GO
IF OBJECT_ID('USP_GET_CLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CLASIFICACION
GO
--Nombre anterior GetClasificacion
CREATE PROCEDURE USP_GET_CLASIFICACION(
	@IdClasificacion INT
) AS BEGIN 
	SELECT IdClasificacion,NombreClasificacion,DescripcionClasificacion,Habilitado FROM CLASIFICACION_PRODUCTO WHERE IdClasificacion = @IdClasificacion;
END
GO
IF OBJECT_ID('USP_CREATE_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_SUBCLASIFICACION
GO
CREATE PROCEDURE USP_CREATE_SUBCLASIFICACION(
	@IdClasificacion INT,
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(150)
) AS BEGIN
	IF EXISTS(SELECT * FROM CLASIFICACION_PRODUCTO where IdClasificacion = @IdClasificacion)
		RAISERROR('La Clasificacion Insertada no se encontro, por lo tanto no se inserto la Subclasificacion.',16,1);
    ELSE
		BEGIN
		INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombreSubclasificacion,DescripcionSubclasificacion)
        VALUES(@IdClasificacion,@Nombre,@Descripcion);
		SELECT @@IDENTITY AS IdSubclasificacion
		END
END
GO
IF OBJECT_ID('USP_UPDATE_SUBCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_SUBCLASIFICACION
GO
CREATE PROCEDURE USP_UPDATE_SUBCLASIFICACION(
	@IdSubClasificacion INT,
    @IdClasificacion INT,
	@Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(150)
    --@Habilitado BIT
) AS BEGIN
	UPDATE SUBCLASIFICACION_PRODUCTO
    SET IdClasificacion= @IdClasificacion,NombreSubClasificacion = @Nombre,DescripcionSubClasificacion  = @Descripcion,UpdateAt=GETDATE() where IdSubClasificacion = @IdSubClasificacion;
END 
GO
IF OBJECT_ID('USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION
GO
CREATE PROCEDURE USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION(
	@IdClasificacion INT
)
AS BEGIN
	SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado FROM SUBCLASIFICACION_PRODUCTO s
    INNER JOIN CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion where s.IdClasificacion=@IdClasificacion;
END
GO
IF OBJECT_ID('USP_GET_SUBCLASIFICACIONES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUBCLASIFICACIONES
GO
--Nombre anterios USP_ListSubClasificaciones 
CREATE PROCEDURE USP_GET_SUBCLASIFICACIONES 
AS BEGIN
	SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado FROM SUBCLASIFICACION_PRODUCTO s
    INNER JOIN CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion;
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
	SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado 
	FROM SUBCLASIFICACION_PRODUCTO s INNER JOIN CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion 
	WHERE IdSubClasificacion=@IdSubClasificacion;
END
GO
IF OBJECT_ID('USP_CREATE_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_PROVEEDOR
GO
CREATE PROCEDURE USP_CREATE_PROVEEDOR(
	@NombreProveedor NVARCHAR(50), -- NOT NULL,
    @Direccion NVARCHAR(200),-- NOT NULL,
    @Email NVARCHAR(100),-- NULL
    @Descripcion NVARCHAR(200),-- NULL,
    @NombreRepresentante NVARCHAR(100) -- NOT NULL,
) AS BEGIN
	INSERT INTO PROVEEDOR(NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante)
    VALUES(@NombreProveedor,@Direccion,@Email,@Descripcion,@NombreRepresentante);
	SELECT @@IDENTITY AS IdProveedor
END 
GO
IF OBJECT_ID('USP_UPDATE_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PROVEEDOR
GO
CREATE PROCEDURE USP_UPDATE_PROVEEDOR(
	@IdProveedor INT,
    @NombreProveedor NVARCHAR(50), -- NOT NULL,
    @Direccion NVARCHAR(200),-- NOT NULL,
    @Email NVARCHAR(100),-- NULL
    @Descripcion NVARCHAR(200),-- NULL,
    @NombreRepresentante NVARCHAR(100) -- NOT NULL,
) AS BEGIN
	UPDATE PROVEEDOR SET NombreProveedor=@NombreProveedor,Direccion=@Direccion,Email=@Email,Descripcion=@Descripcion,
    NombreRepresentante=@NombreRepresentante,UpdateAt=GETDATE() WHERE IdProveedor = @IdProveedor;
END 
GO
IF OBJECT_ID('USP_CREATE_NUMEROPROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_NUMEROPROVEEDOR
GO 
--Nombre Anterior USP_InsertNumeroProveedor
CREATE PROCEDURE USP_CREATE_NUMEROPROVEEDOR(
    @IdProveedor INT,
	@IdOperadora INT,
    @Prefijo NVARCHAR(3),
    @NumeroTelefono NVARCHAR(50) --not null
) AS BEGIN
	INSERT INTO NUMERO_TELEFONO_PROVEEDOR(IdProveedor,IdOperadora,Prefijo,NumeroTelefono)
    VALUES(@IdProveedor,@IdOperadora,@Prefijo,@NumeroTelefono);
	SELECT @@IDENTITY AS IdNumero
END 
GO
IF OBJECT_ID('USP_UPDATE_NUMERO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_NUMERO_PROVEEDOR
GO
CREATE PROCEDURE USP_UPDATE_NUMERO_PROVEEDOR(
	@IdProveedor INT,
	@IdOperadora INT,
    @IdNumero INT,
	@Prefijo NVARCHAR(3),
    @NumeroTelefono NVARCHAR(50) --not null
) AS BEGIN
		UPDATE NUMERO_TELEFONO_PROVEEDOR SET Prefijo = @Prefijo,IdOperadora=@IdOperadora, NumeroTelefono = @NumeroTelefono,UpdateAt=GETDATE() where IdProveedor = @IdProveedor AND IdNumero = @IdNumero;
END 
GO
IF OBJECT_ID('USP_GET_PROVEEDORES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PROVEEDORES
GO
CREATE PROCEDURE USP_GET_PROVEEDORES
AS BEGIN
	SELECT IdProveedor,NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante FROM PROVEEDOR;
END
GO
IF OBJECT_ID('USP_GET_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_PROVEEDOR(
	@IdProveedor INT
) AS BEGIN 
	SELECT IdProveedor,NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante FROM PROVEEDOR where IdProveedor = @IdProveedor;
END
GO
IF OBJECT_ID('USP_GET_NUMEROS_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_NUMEROS_PROVEEDOR
GO
CREATE PROCEDURE USP_GET_NUMEROS_PROVEEDOR(
	@IdProovedor INT
) 
AS BEGIN
	SELECT IdNumero,IdProveedor,Prefijo,NumeroTelefono FROM NUMERO_TELEFONO_PROVEEDOR WHERE IdProveedor = @IdProovedor;
END
GO
IF OBJECT_ID('USP_GET_NUMEROESPECIFICO','P') IS NOT NULL
	DROP PROCEDURE USP_GET_NUMEROESPECIFICO
GO
CREATE PROCEDURE USP_GET_NUMEROESPECIFICO(
	@IdProveedor INT,
    @IdNumero INT
) AS BEGIN
	SELECT IdNumero,IdProveedor,Prefijo,NumeroTelefono FROM NUMERO_TELEFONO_PROVEEDOR WHERE IdProveedor = @IdProveedor AND IdNumero = @IdNumero;
END
GO
