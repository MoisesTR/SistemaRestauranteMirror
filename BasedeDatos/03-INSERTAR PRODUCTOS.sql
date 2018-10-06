USE pruebas_node;


INSERT INTO PROVEEDOR(IdPais,NombreProveedor,Direccion,Email,Imagen,Descripcion,NombreRepresentante,IdTipoDocumento,Documento,Retencion2,Mercado,CreatedAt)
VALUES (1,'Cargil','De donde fue el cine salinas 2 cuadras abajo 1/2 al lago','moisestrigueros@hotmail.com','ninguna','ninguna','Moises',1,'1231231',0,0,GETDATE())


DECLARE @IdProveedor INT;
SET @IdProveedor = (SELECT TOP 1 IdProveedor  FROM PROVEEDOR)

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,TipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD12','Filete de pollo','Filetes de pollo','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,TipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD13','Tallarin','Bolsa de tallarines','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,TipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD14','Camaron','Bolsa de camarones','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,TipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD15','Arroz','Bolsa de arroz','null')

INSERT INTO PRODUCTO(IdProveedor,IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasRotacion,TipoInsumo,CodigoProducto,NombreProducto,Descripcion,Imagen)
VALUES(@IdProveedor,1,1,1,1,1,20,1,30,1,'COD16','Hongos','Bolsa de hongos','null')

