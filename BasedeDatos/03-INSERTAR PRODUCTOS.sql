USE pruebas_node;

INSERT INTO PRODUCTO(NombreProducto,Descripcion,IdCategoria,IdSubclasificacion,IdEstado)
VALUES('Filete de Pollo','Filetes de pollo sin hueso.',2,1,1);

INSERT INTO PRODUCTO(NombreProducto,Descripcion,IdCategoria,IdSubclasificacion,IdEstado)
VALUES('Tallarin','Bolsa de tallarines.',1,3,1);

INSERT INTO PRODUCTO(NombreProducto,Descripcion,IdCategoria,IdSubclasificacion,IdEstado)
VALUES('Camaron','Bolsa de Camarones.',1,3,1);


INSERT INTO PRODUCTO(NombreProducto,Descripcion,IdCategoria,IdSubclasificacion,IdEstado)
VALUES('Arroz','Bolsa de Arroz.',3,3,1);

INSERT INTO PRODUCTO(NombreProducto,Descripcion,IdCategoria,IdSubclasificacion,IdEstado)
VALUES('Hongos','Bolsa de Hongos.',1,3,1);


--INSERT INTO PRODUCTO(NombreProducto,Descripcion,IdCategoria,IdSubclasificacion,Imagen,IdEstado)
--select NombreProducto,Descripcion,IdCategoria,IdSubclasificacion,Imagen,IdEstado from PRODUCTO
--VALUES('Res','Bolsa de Res.',2,3,NULL,1);

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
--SELECT * FROM CLASIFICACION_PRODUCTO 



select * from PRODUCTO