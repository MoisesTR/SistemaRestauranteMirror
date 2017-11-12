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
    @Imagen NVARCHAR(100) NULL
) AS BEGIN
	INSERT INTO PRODUCTO(IdCategoria,IdSubclasificacion,IdEstado,NombreProducto,Descripcion,Imagen)
	VALUES(@IdCategoria,@IdSubclasificacion,@IdEstado,@NombreProducto,@Descripcion,@Imagen)
	SELECT @@IDENTITY AS IdProducto
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
	UPDATE PRODUCTO SET IdCategoria=@IdCategoria,IdSubclasificacion=@IdSubclasificacion,IdEstado=@IdEstado,NombreProducto=@NombreProducto,Descripcion=@Descripcion,Imagen=@Imagen,UpdateAt=GETDATE()
    where IdProducto = @IdProducto;
END
GO
IF OBJECT_ID('USP_DISP_PRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_PRODUCTO
GO
CREATE PROCEDURE USP_DISP_PRODUCTO(
	@IdProducto INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE PRODUCTO SET Habilitado = @Habilitado WHERE IdProducto=@IdProducto
END
GO
IF OBJECT_ID('USP_GET_PRODUCTOS_PROVEEDORES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_PRODUCTOS_PROVEEDORES
GO
CREATE PROCEDURE USP_GET_PRODUCTOS_PROVEEDORES
AS BEGIN
	SELECT * FROM V_ProductosDetallados;
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
IF OBJECT_ID('USP_CREATE_EMPAQUE','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_EMPAQUE
GO
CREATE PROCEDURE USP_CREATE_EMPAQUE(
	@NombreEmpaque NVARCHAR(50),
	@Descripcion NVARCHAR(150)
)
AS BEGIN
	INSERT INTO Empaque(NombreEmpaque,Descripcion)
	VALUES(@NombreEmpaque,@Descripcion)
	SELECT @@IDENTITY AS IdEmpaque
END
GO
IF OBJECT_ID('USP_GET_EMPAQUES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_EMPAQUES
GO
CREATE PROCEDURE USP_GET_EMPAQUES
AS BEGIN
	SELECT IdEmpaque,NombreEmpaque,Descripcion,Habilitado FROM EMPAQUE
END
GO
IF OBJECT_ID('USP_CREATE_ENVASE','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_ENVASE
GO
CREATE PROCEDURE USP_CREATE_ENVASE(
	@NombreEnvase NVARCHAR(50),
	@Descripcion NVARCHAR(150)
)
AS BEGIN
	INSERT INTO Envase(NombreEnvase,Descripcion)
	VALUES(@NombreEnvase,@Descripcion)
	SELECT @@IDENTITY AS IdEnvase
END
GO
IF OBJECT_ID('USP_GET_ENVASES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ENVASES
GO
CREATE PROCEDURE USP_GET_ENVASES
AS BEGIN
	SELECT IdEnvase,NombreEnvase,Descripcion,Habilitado FROM ENVASE
END
GO
IF OBJECT_ID('USP_DISP_ENVASES','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_ENVASES
GO
CREATE PROCEDURE USP_DISP_ENVASES(
	@IdTelefonoSucursal INT, 
	@IdSucursal INT,
	@Habilitado BIT
)
AS BEGIN 
	UPDATE ENVASE SET Habilitado=@Habilitado
END
GO
IF OBJECT_ID('USP_GET_ESTADOSPRODUCTO','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ESTADOSPRODUCTO
GO
CREATE PROCEDURE USP_GET_ESTADOSPRODUCTO
AS BEGIN
	SELECT IdEstado,Nombre,Descripcion,Habilitado FROM ESTADO_PRODUCTO
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
	@IdClasificacionUnidadMedida INT,
    @NombreUnidad NVARCHAR(50),
    @Simbolo NVARCHAR(3)
)
AS BEGIN
	INSERT INTO UNIDAD_MEDIDA(IdClasificacionUnidadMedida,NombreUnidad,Simbolo)
	VALUES(@IdClasificacionUnidadMedida,@NombreUnidad,@Simbolo)
	SELECT @@IDENTITY AS IdUnidadMedida
END
GO
IF OBJECT_ID('USP_GET_UNIDADES_DE_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE USP_GET_UNIDADES_DE_MEDIDA
GO
CREATE PROCEDURE USP_GET_UNIDADES_DE_MEDIDA
AS BEGIN
	SELECT  IdUnidadMedida,IdClasificacionUnidadMedida,NombreUnidad,Simbolo,Habilitado FROM UNIDAD_MEDIDA
END
GO
IF OBJECT_ID('USP_GET_UNIDAD_DE_MEDIDA','P') IS NOT NULL
	DROP PROCEDURE USP_GET_UNIDAD_DE_MEDIDA
GO
CREATE PROCEDURE USP_GET_UNIDAD_DE_MEDIDA(
	@IdUnidadMedida INT
)
AS BEGIN
	SELECT  IdUnidadMedida,IdClasificacionUnidadMedida,NombreUnidad,Simbolo,Habilitado FROM UNIDAD_MEDIDA WHERE IdUnidadMedida = @IdUnidadMedida
END
GO
IF OBJECT_ID('USP_CREATE_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_SUCURSAL
GO
CREATE PROCEDURE USP_CREATE_SUCURSAL(
    @NombreSucursal NVARCHAR(100) ,
    @Direccion NVARCHAR(250) 
)
AS BEGIN 
	INSERT INTO SUCURSAL(NombreSucursal,Direccion)
	VALUES(@NombreSucursal,@Direccion)
	SELECT @@IDENTITY AS IdSucursal
END
GO
IF OBJECT_ID('USP_GET_SUCURSALES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUCURSALES
GO
CREATE PROCEDURE USP_GET_SUCURSALES
AS 
SELECT IdSucursal,NombreSucursal,Direccion from SUCURSAL
GO
IF OBJECT_ID('USP_GET_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_SUCURSAL
GO
CREATE PROCEDURE USP_GET_SUCURSAL
	@IdSucursal INT
AS 
	SELECT IdSucursal,NombreSucursal,Direccion from SUCURSAL WHERE IdSucursal = @IdSucursal
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
    @ValorUnidadMedida FLOAT,
	@CantidadEmpaque INT NULL, --si tiene empaque 
	@Costo Money
) AS BEGIN
	INSERT INTO PRODUCTO_PROVEEDOR(IdProducto,IdProveedor,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,Costo)
	VALUES(@IdProducto,@IdProveedor,@IdEnvase,@IdEmpaque,@IdUnidadMedida,@ValorUnidadMedida,@CantidadEmpaque,@Costo)
	SELECT @@IDENTITY AS IdProductoProveedor
END 
GO
IF OBJECT_ID('USP_UPDATE_PRODUCTO_PROVEEDOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_PRODUCTO_PROVEEDOR
GO
CREATE PROCEDURE USP_UPDATE_PRODUCTO_PROVEEDOR(
	@IdProductoProveedor INT,
	@IdProveedor INT,
	@IdEnvase INT NULL, --id del envase si es que tiene
    @IdEmpaque INT NULL, --id del empaque si es que tiene
	@IdUnidadMedida INT,
    @ValorUnidadMedida FLOAT,
	@CantidadEmpaque INT NULL, --si tiene empaque 
	@Costo Money
) AS BEGIN 
	UPDATE PRODUCTO_PROVEEDOR SET  IdProveedor=@IdProveedor,IdEnvase=@IdEnvase,IdEmpaque=@IdEmpaque,IdUnidadMedida=@IdUnidadMedida,ValorUnidadMedida=@ValorUnidadMedida,cantidadEmpaque=@CantidadEmpaque,Costo=@Costo,UpdateAt=GETDATE()
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
IF OBJECT_ID('UPS_CREATE_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE UPS_CREATE_TRABAJADOR
GO
CREATE PROCEDURE UPS_CREATE_TRABAJADOR(
	@IdSucursal INT NULL,
    @IdCargo INT,
    @Nombres NVARCHAR(50),
    @Apellidos NVARCHAR(50),
    @NumeroCedula NVARCHAR(50),
    @FechaNacimiento DATE,
    @Direccion NVARCHAR(300),
    @FechaIngreso DATE 
)
AS BEGIN 
	INSERT INTO TRABAJADOR(IdSucursal,IdCargo,Nombres,Apellidos,NumeroCedula,FechaNacimiento,Direccion,FechaIngreso)
	VALUES(@IdSucursal,@IdCargo,@Nombres,@Apellidos,@NumeroCedula,@FechaNacimiento,@Direccion,@FechaIngreso)
	SELECT @@IDENTITY AS IdTrabajador
END
GO
IF OBJECT_ID('USP_UPDATE_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_TRABAJADOR
GO
CREATE PROCEDURE USP_UPDATE_TRABAJADOR(	
	@IdTrabajador INT,
	@IdSucursal INT NULL,
    @IdCargo INT,
    @Nombres NVARCHAR(50),
    @Apellidos NVARCHAR(50),
    @NumeroCedula NVARCHAR(50),
    @FechaNacimiento DATE,
    @Direccion NVARCHAR(300),
    @FechaIngreso DATE 
)
AS BEGIN 
	UPDATE TRABAJADOR SET IdSucursal=@IdSucursal,IdCargo=@IdCargo,nombres=@Nombres,Apellidos=@Apellidos,
	NumeroCedula=@NumeroCedula,FechaNacimiento=@FechaNacimiento,UpdateAt=GETDATE()
	SELECT @@IDENTITY AS IdTrabajador
END
GO
IF OBJECT_ID('USP_CREATE_TELEFONO_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_TELEFONO_SUCURSAL
GO
CREATE PROCEDURE USP_CREATE_TELEFONO_SUCURSAL(
	@IdSucursal INT,
	@IdOperadora INT,
	@NumeroTelefono NVARCHAR(20)
)
AS BEGIN
	INSERT INTO TELEFONO_SUCURSAL(IdSucursal,IdOperadora,NumeroTelefono)
	VALUES(@IdSucursal,@IdOperadora,@NumeroTelefono)
	SELECT @@IDENTITY AS IdTelefonoSucursal
END
GO
CREATE PROCEDURE USP_ALTER_TELEFONO_SUCURSAL(
	@IdTelefonoSucursal INT,
	@IdSucursal INT,
	@IdOperadora INT,
	@NumeroTelefono NVARCHAR(20)
)
AS BEGIN
	UPDATE TELEFONO_SUCURSAL SET IdSucursal=@IdSucursal,IdOperadora=@IdOperadora,NumeroTelefono=@NumeroTelefono
	WHERE IdTelefonoSucursal=@IdTelefonoSucursal AND IdSucursal=@IdSucursal
END
GO
CREATE PROCEDURE USP_DISP_TELEFONO_SUCURSAL(
	@IdTelefonoSucursal INT,
	@IdSucursal INT,
	@Habilitado BIT
)
AS BEGIN
	UPDATE TELEFONO_SUCURSAL SET Habilitado=@Habilitado WHERE IdTelefonoSucursal=@IdTelefonoSucursal AND IdSucursal=@IdSucursal
END