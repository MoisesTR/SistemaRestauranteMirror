USE pruebas_node;

INSERT INTO PRODUCTO(NombreProducto,Costo,Descripcion,IdCategoria,IdSubclasificacion,
    IdEnvase,IdEmpaque,CantidadEmpaque,Imagen,IdUnidadMedida,ValorUnidadMedida,IdEstado,IdProveedor)
VALUES('Filete de Pollo',290,'Filetes de pollo sin hueso.',2,1,1,NULL,NULL,NULL,1,29.5,1,1);

INSERT INTO PRODUCTO(NombreProducto,Costo,Descripcion,IdCategoria,IdSubclasificacion,
    IdEnvase,IdEmpaque,CantidadEmpaque,Imagen,IdUnidadMedida,ValorUnidadMedida,IdEstado,IdProveedor)
VALUES('Tallarin',320,'Bolsa de tallarines.',1,3,1,3,20,NULL,1,0.5,1,2);

INSERT INTO PRODUCTO(NombreProducto,Costo,Descripcion,IdCategoria,IdSubclasificacion,
    IdEnvase,IdEmpaque,CantidadEmpaque,Imagen,IdUnidadMedida,ValorUnidadMedida,IdEstado,IdProveedor)
VALUES('Camaron',420,'Bolsa de Camarones.',1,3,1,3,20,NULL,1,0.5,1,2);

INSERT INTO PRODUCTO(NombreProducto,Costo,Descripcion,IdCategoria,IdSubclasificacion,
    IdEnvase,IdEmpaque,CantidadEmpaque,Imagen,IdUnidadMedida,ValorUnidadMedida,IdEstado,IdProveedor)
VALUES('Arroz',420,'Bolsa de Arroz.',1,3,1,3,20,NULL,1,0.5,1,2);

INSERT INTO PRODUCTO(NombreProducto,Costo,Descripcion,IdCategoria,IdSubclasificacion,
    IdEnvase,IdEmpaque,CantidadEmpaque,Imagen,IdUnidadMedida,ValorUnidadMedida,IdEstado,IdProveedor)
VALUES('Hongos',420,'Bolsa de Hongos.',1,3,1,3,20,NULL,1,0.5,1,2);

INSERT INTO PRODUCTO(NombreProducto,Costo,Descripcion,IdCategoria,IdSubclasificacion,
    IdEnvase,IdEmpaque,CantidadEmpaque,Imagen,IdUnidadMedida,ValorUnidadMedida,IdEstado,IdProveedor)
VALUES('Res',420,'Bolsa de Res.',1,3,1,3,20,NULL,1,0.5,1,2);

-- INSERT INTO BodegaSucursal(Nombre,DescripcionLocal)
-- VALUES('Bodega de Rubenia','');
-- 
-- INSERT INTO Sucursal(Principal,NombreSucursal,Direccion,IdBodega,TelefonoPrincipal)
-- VALUES(1,'Sucursal Rubenia','Frente al paso desnivel Rubenia',1,'255-12323');
-- 
-- INSERT INTO Trabajador(IdSucursal,Nombres,Apellidos,NumeroCedula,FechaNacimiento,Direccion,FechaIngreso,IdCargo,Activo)
-- VALUES(1,'Cristhian','Chang','001-12121-121G','1992/04/12','Rubenia',curdate(),1,1);
-- 
-- INSERT INTO BodegaCentral(Nombre,Descripcion)
-- VALUES('Bodega Central','Bodega de la planta de produccion.');
-- 
-- INSERT INTO EntradaBodegaCentral(IdBodega,FechaHora,IdTrabajador) 
-- VALUES(1,now(),1); 
-- 
-- INSERT INTO DetalleEntradaBodegaCentral(IdEntrada,IdProducto,Cantidad,IdProcedencia)
-- VALUES(1,2,2,2);#cambiar a 1
-- 


-- DESC Producto