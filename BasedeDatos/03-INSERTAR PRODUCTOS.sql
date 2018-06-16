USE pruebas_node;


INSERT INTO PRODUCTO(IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasCaducidad,NombreProducto,Descripcion,Imagen)
VALUES(1,1,1,1,1,20,1,30,'Filete de pollo','Filetes de pollo','null')

INSERT INTO PRODUCTO(IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasCaducidad,NombreProducto,Descripcion,Imagen)
VALUES(1,1,1,1,1,20,1,30,'Tallarin','Bolsa de tallarines','null')

INSERT INTO PRODUCTO(IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasCaducidad,NombreProducto,Descripcion,Imagen)
VALUES(1,1,1,1,1,20,1,30,'Camaron','Bolsa de camarones','null')

INSERT INTO PRODUCTO(IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasCaducidad,NombreProducto,Descripcion,Imagen)
VALUES(1,1,1,1,1,20,1,30,'Arroz','Bolsa de arroz','null')

INSERT INTO PRODUCTO(IdSubClasificacion,IdEstado,IdEnvase,IdEmpaque,IdUnidadMedida,ValorUnidadMedida,CantidadEmpaque,DiasCaducidad,NombreProducto,Descripcion,Imagen)
VALUES(1,1,1,1,1,20,1,30,'Hongos','Bolsa de hongos','null')



--INSERT INTO PRODUCTO(NombreProducto,Descripcion,IdCategoria,IdSubClasificacion,Imagen,IdEstado)
--select NombreProducto,Descripcion,IdCategoria,IdSubClasificacion,Imagen,IdEstado from PRODUCTO
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
