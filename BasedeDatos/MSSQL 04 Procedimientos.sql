use pruebas_node;
go
CREATE PROCEDURE USP_CREATE_CATEGORIA(
	@Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(150) 
) 
AS 
BEGIN
	IF EXISTS(SELECT * FROM CATEGORIA_PRODUCTO where NombreCategoria = @Nombre) 
		SELECT 'Nombre de Categoria duplicado.'
	ELSE
		BEGIN
			INSERT INTO CATEGORIA_PRODUCTO(NombreCategoria,DescripcionCategoria)
			VALUES(@Nombre,@Descripcion);
		END
END
GO
CREATE PROCEDURE USP_GET_CATEGORIAS
AS 
BEGIN
	SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado FROM CATEGORIA_PRODUCTO;
END
GO
CREATE PROCEDURE USP_UPDATE_CATEGORIA(
	@IdCategoria INT,
    @Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(150)
) 
AS 
BEGIN
	UPDATE CATEGORIA_PRODUCTO SET NombreCategoria = @Nombre,DescripcionCategoria = @Descripcion WHERE IdCategoria = @IdCategoria;
END
GO
CREATE PROCEDURE USP_GET_CATEGORIA_BY_ID(
	@IdCategoria INT
) AS BEGIN
	SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado FROM CATEGORIA_PRODUCTO WHERE IdCategoria = @IdCategoria;
END 
GO
CREATE PROCEDURE USP_GET_CATEGORIA_BY_NOMBRE(
	@Nombre INT
) AS BEGIN
	SELECT IdCategoria,NombreCategoria,DescripcionCategoria,Habilitado FROM CATEGORIA_PRODUCTO WHERE NombreCategoria = @Nombre;
END 
GO
CREATE PROCEDURE USP_CREATE_CLASIFICACION(
	@Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(150)
) AS BEGIN
	-- IF EXISTS(SELECT * from ClasificacionProducto where NombreClasificacion = @Nombre) THEN
-- 		SIGNAL SQLSTATE '23000'
-- 		SET MESSAGE_TEXT = 'Clasificacion Duplicada, No se inserto.';
-- 	ELSE
		INSERT INTO CLASIFICACION_PRODUCTO(NombreClasificacion,DescripcionClasificacion)
		VALUES(@Nombre,@Descripcion);		
--     END IF;
END 

GO
CREATE PROCEDURE USP_GET_CLASIFICACIONES
AS BEGIN
	SELECT IdClasificacion,NombreClasificacion,DescripcionClasificacion,Habilitado FROM CLASIFICACION_PRODUCTO;
END

GO
CREATE PROCEDURE USP_UPDATE_CLASIFICACION(
	@IdClasificacion int,
	@Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(150)
	--,@Habilitado BIT
) 
AS BEGIN
	UPDATE CLASIFICACION_PRODUCTO
    SET NombreClasificacion = @Nombre,DescripcionClasificacion  = @Descripcion where IdClasificacion = @IdClasificacion;
END
GO
--Nombre anterior USP_DispClasificaion
CREATE PROCEDURE USP_DISP_CLASIFICACION(
	@IdClasificacion INT
) AS BEGIN 
	UPDATE CLASIFICACION_PRODUCTO SET Habilitado = ~Habilitado WHERE IdClasificacion = @IdClasificacion;
END 
GO
--Nombre anterior GetClasificacion
CREATE PROCEDURE USP_GET_CLASIFICACION(
	@IdClasificacion INT
) AS BEGIN 
	SELECT IdClasificacion,NombreClasificacion,DescripcionClasificacion,Habilitado FROM CLASIFICACION_PRODUCTO WHERE IdClasificacion = @IdClasificacion;
END
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
		END
END
GO
CREATE PROCEDURE USP_UPDATE_SUBCLASIFICACION(
	@IdSubClasificacion INT,
    @IdClasificacion INT,
	@Nombre NVARCHAR(50),
    @Descripcion NVARCHAR(150),
    --@Habilitado BIT
) AS BEGIN
	UPDATE SUBCLASIFICACION_PRODUCTO
    SET IdClasificacion= @IdClasificacion,NombreSubClasificacion = @Nombre,DescripcionSubClasificacion  = @Descripcion,Habilitado = @Habilitado where IdSubClasificacion = @IdSubClasificacion;
END 
GO
CREATE PROCEDURE USP_GET_SUBCLASIFICACIONES_BY_IDCLASIFICACION(
	@IdClasificacion INT
)
AS BEGIN
	SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado FROM SubClasificacionProducto s
    INNER JOIN ClasificacionProducto c ON s.IdClasificacion = c.IdClasificacion where s.IdClasificacion=@IdClasificacion;
END
GO
--Nombre anterios USP_ListSubClasificaciones 
CREATE PROCEDURE USP_GET_SUBCLASIFICACIONES 
AS BEGIN
	SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado FROM SubClasificacionProducto s
    INNER JOIN ClasificacionProducto c ON s.IdClasificacion = c.IdClasificacion;
END
GO
--Nombre anterior USP_DispSubClasificaion
CREATE PROCEDURE USP_DISP_SUBCLASIFICACION(
	@IdSubClasificacion INT
) AS BEGIN 
	UPDATE SubClasificacionProducto SET Habilitado = ~Habilitado WHERE IdSubClasificacion = @IdSubClasificacion;
END 
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
CREATE PROCEDURE USP_CREATE_PROVEEDOR(
	@NombreProveedor NVARCHAR(50), -- NOT NULL,
    @Direccion NVARCHAR(200),-- NOT NULL,
    @Email NVARCHAR(100),-- NULL
    @Descripcion NVARCHAR(200),-- NULL,
    @NombreRepresentante NVARCHAR(100) -- NOT NULL,
) AS BEGIN
	INSERT INTO PROVEEDOR(NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante)
    VALUES(@NombreProveedor,@Direccion,@Email,@Descripcion,@NombreRepresentante);
END 
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
    NombreRepresentante=@NombreRepresentante WHERE IdProveedor = @IdProveedor;
END 
GO
--Nombre Anterior USP_InsertNumeroProveedor
CREATE PROCEDURE USP_CREATE_NUMEROPROVEEDOR(
    @IdProveedor INT,
    @Prefijo NVARCHAR(3),
    @NumeroTelefono NVARCHAR(50) --not null
) AS BEGIN
	INSERT INTO NUMERO_TELEFONO_PROVEEDOR(IdProveedor,Prefijo,NumeroTelefono)
    VALUES(@IdProveedor,@Prefijo,@NumeroTelefono);
END 
GO
CREATE PROCEDURE USP_UPDATE_NUMEROPROVEEDOR(
	@IdProveedor INT,
    @IdNumero INT,
	@Prefijo NVARCHAR(3),
    @NumeroTelefono NVARCHAR(50) --not null
) AS BEGIN
		UPDATE NUMERO_TELEFONO_PROVEEDOR SET Prefijo = @Prefijo, NumeroTelefono = @NumeroTelefono where IdProveedor = @IdProveedor AND IdNumero = @IdNumero;
END 
GO
CREATE PROCEDURE USP_GET_PROVEEDORES
AS BEGIN
	SELECT IdProveedor,NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante FROM PROVEEDOR;
END
 
GO
CREATE PROCEDURE USP_GET_PROVEEDOR(
	@IdProveedor INT
) AS BEGIN 
	SELECT IdProveedor,NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante FROM PROVEEDOR where IdProveedor = @IdProveedor;
END

GO
CREATE PROCEDURE USP_GET_NUMEROSPROVEEDOR(
	@IdProovedor INT
) 
AS BEGIN
	SELECT IdNumero,IdProveedor,Prefijo,NumeroTelefono FROM NUMERO_TELEFONO_PROVEEDOR WHERE IdProveedor = @IdProveedor;
END

GO
CREATE PROCEDURE USP_GET_NUMEROESPECIFICO(
	@IdProveedor INT,
    @IdNumero INT
) AS BEGIN
	SELECT IdNumero,IdProveedor,Prefijo,NumeroTelefono FROM NUMERO_TELEFONO_PROVEEDOR WHERE IdProveedor = @IdProveedor AND IdNumero = @IdNumero;
END
GO
CREATE PROCEDURE USP_CREATE_PRODUCTO(
	@IdCategoria INT,
    @IdSubclasificacion INT,
    @IdEnvase INT,-- NULL id del envase si es que tiene
    @IdEmpaque INT,-- NULL id del empaque si es que tiene
    @IdEstado int, -- not null,
    @IdProveedor int, -- not null,
    @NombreProducto NVARCHAR(50),-- NOT NULL,
    @Costo NUMERIC(6,2), -- NOT NULL,
    @Descripcion NVARCHAR(200), -- NOT NULL,
	@CantidadEmpaque INT,-- NULL si tiene empaque 
    @Imagen NVARCHAR(100), -- NULL
    @IdUnidadMedida INT, -- not null
    @ValorUnidadMedida FLOAT -- NOT NULL
) AS BEGIN
	INSERT INTO PRODUCTO(NombreProducto,Costo,Descripcion,IdCategoria,IdSubclasificacion,IdEnvase,IdEmpaque,
    CantidadEmpaque,Imagen,IdUnidadMedida,ValorUnidadMedida,IdEstado,IdProveedor)
	VALUES(@NombreProducto,@Costo,@Descripcion,@IdCategoria,@IdSubclasificacion,
    @IdEnvase,@IdEmpaque,@CantidadEmpaque,@Imagen,@IdUnidadMedida,@ValorUnidadMedida,@IdEstado,@IdProveedor);
END 

GO
CREATE PROCEDURE USP_UPDATE_PRODUCTO(
	@IdProducto INT,
    @IdCategoria INT,
    @IdSubclasificacion INT,
    @IdEnvase INT,-- NULL id del envase si es que tiene
    @IdEmpaque INT,-- NULL id del empaque si es que tiene
    @IdEstado int, -- not null,
    @IdProveedor int, -- not null,
    @NombreProducto NVARCHAR(50),-- NOT NULL,
    @Costo NUMERIC(6,2), -- NOT NULL,
    @Descripcion NVARCHAR(200), -- NOT NULL,
	@CantidadEmpaque INT,-- NULL si tiene empaque 
    @Imagen NVARCHAR(100), -- NULL
    @IdUnidadMedida INT, -- not null
    @ValorUnidadMedida FLOAT -- NOT NULL
) AS BEGIN 
	UPDATE PRODUCTO SET NombreProducto = @NombreProducto,Costo=@Costo,Descripcion=@Descripcion,IdCategoria=@IdCategoria,
    IdSubclasificacion=@IdSubclasificacion,IdEnvase=@IdEnvase,IdEmpaque=@IdEmpaque,CantidadEmpaque=@CantidadEmpaque,
    Imagen=@Imagen,IdUnidadMedida=@IdUnidadMedida,ValorUnidadMedida=@ValorUnidadMedida,IdEstado=@IdEstado,IdProveedor=@IdProveedor
    where IdProducto = @IdProducto;
END

GO
CREATE PROCEDURE USP_GET_PRODUCTOS
AS BEGIN
	SELECT * FROM V_ProductosDetallados;
END 

GO
CREATE PROCEDURE USP_GET_PRODUCTO(
	@IdProducto INT
) AS BEGIN
	SELECT * FROM V_ProductosDetallados WHERE IdProducto = @IdProducto;
END

GO
CREATE PROCEDURE USP_DispProducto(
	@IdProducto INT
) AS BEGIN
	UPDATE PRODUCTO set Habilitado = ~Habilitado Where IdProducto = @IdProducto;
END 

GO
CREATE PROCEDURE USP_GET_EMPAQUES
AS BEGIN
	SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM EMPAQUE
END
GO

CREATE PROCEDURE USP_GET_ENVASES
AS BEGIN
	SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado FROM ENVASE
END
GO
CREATE PROCEDURE USP_GET_ESTADOSPRODUCTO
AS BEGIN
	SELECT IdEstado,Nombre,Descripcion,Habilitado FROM ESTADO_PRODUCTO
END