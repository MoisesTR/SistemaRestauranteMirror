--Opciones Generales del menu(Menues Padres)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Inicio','Pantalla inicial del sistema','/','./assets/img/icon/home.png','no-collase',1)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Insumos','Insumos (Inventario)','#','./assets/img/icon/product.png','',2)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Factura','Facturas de sistema sistema','#','./assets/img/icon/facturas.png','',4)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Reportes','Modulo de reportes','/reportes','/assets/img/icon/reportes.png','no-collase',5)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Catalogos','Catalogos de sistema','#','./assets/img/icon/catalogo.png','',6)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Sucursales','Sucursales del restaurante ','/sucursales','./assets/img/icon/sucursales.png','no-collase',7)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Trabajadores','Trabajadores asociados al restaurante','/trabajador','./assets/img/icon/trabajadores.png','no-collase',8)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Cargos','Cargos que ocupan los trabajadores en el restaurante ','/cargo','./assets/img/icon/roles.png','no-collase',9)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Salidas','Salidas del inventario de bodega','/salida-producto','./assets/img/icon/ventas.png','no-collase',10)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Configuraciones','Configuraciones generales del sistema','/configuraciones','./assets/img/icon/configuraciones.png','no-collase',11)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Clase,Orden) VALUES ('Proveedor','Modulo de Proveedor','#','./assets/img/icon/proveedores.png','',3)

--Opciones especificas del menu(Submenues)

--MENU FACTURA
--SUBMENUES
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Factura','Modulo Factura','/factura/add','ninguno',1,3)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Proveedor','Modulo Proveedor','/proveedor','ninguno',2,11)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Productos','Catalogos de sistema','/producto','ninguno',3,2)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Busqueda Facturas','Modulo Factura','/factura/busquedafacturas','ninguno',4,3)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Total','Modulo Factura','/factura/summaryFactura','ninguno',4,3)


--MENU CATALOGOS
--SUBMENUES

INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Categoria','Categorias de los productos','/categorias','ninguno',1,5)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Clasificacion','Clasificaciones de los productos','/clasificacion-productos','ninguno',2,5)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Subclasificación','Subclasificaciones de los productos','/subclasificacion-productos','ninguno',3,5)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Empaques','Empaques de los productos','/empaques','ninguno',4,5)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Envases','Envases de los productos','/envases','ninguno',5,5)
INSERT INTO dbo.RECURSO_SISTEMA(Nombre,Descripcion,Ruta,Icono,Orden,IdMenuPadre) VALUES ('Unidades Medida','Unidades de medida de los productos','/unidadmedida','ninguno',6,5)

INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,1)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,2)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,3)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,4)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,5)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,6)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,7)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,8)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,9)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,10)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,11)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,12)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,13)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,14)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,15)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,16)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,17)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,18)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,19)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,20)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,21)
INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(1,22)

--INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(2,1)
--INSERT INTO dbo.ROL_RECURSO_SISTEMA(IdRol,IdRecursoSistema) VALUES(2,3)

