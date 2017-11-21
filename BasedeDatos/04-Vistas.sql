USE pruebas_node;
GO
IF OBJECT_ID('V_ProductosDetallados','V') IS NOT NULL
	DROP VIEW V_ProductosDetallados
GO
CREATE VIEW V_ProductosDetallados
AS
SELECT p.IdProducto,p.NombreProducto,PP.Costo,p.Descripcion,p.IdCategoria,cp.NombreCategoria,p.IdSubClasificacion,
    sp.NombreSubClasificacion,cl.IdClasificacion,cl.NombreClasificacion,PP.IdEnvase,e.NombreEnvase,PP.IdEmpaque,em.NombreEmpaque,
    PP.CantidadEmpaque,p.Imagen,PP.IdUnidadMedida,um.NombreUnidad,PP.ValorUnidadMedida,p.IdEstado,ep.Nombre,
    PP.IdProveedor,PV.NombreProveedor,p.Habilitado,P.DiasCaducidad,P.CreatedAt,P.UpdateAt
    FROM Producto p INNER JOIN CATEGORIA_PRODUCTO cp ON p.IdCategoria = cp.IdCategoria
	INNER JOIN PRODUCTO_PROVEEDOR PP ON P.IdProducto = PP.IdProducto
    INNER JOIN PROVEEDOR PV ON PP.IdProveedor = PV.IdProveedor
    INNER JOIN SUBCLASIFICACION_PRODUCTO sp ON p.IdSubClasificacion = sp.IdSubClasificacion
    INNER JOIN CLASIFICACION_PRODUCTO cl ON sp.IdClasificacion = cl.IdClasificacion
    LEFT JOIN ENVASE e ON PP.IdEnvase = e.IdEnvase
    LEFT JOIN EMPAQUE em ON PP.IdEmpaque = em.IdEmpaque
    INNER JOIN UNIDAD_MEDIDA um ON PP.IdUnidadMedida = um.IdUnidadMedida
    INNER JOIN ESTADO_PRODUCTO ep ON p.IdEstado = ep.IdEstado;
GO
IF OBJECT_ID('V_SUBCLASIFICACIONES','V') IS NOT NULL
	DROP VIEW V_SUBCLASIFICACIONES
GO
CREATE VIEW V_SUBCLASIFICACIONES
AS
SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado FROM SUBCLASIFICACION_PRODUCTO s
    INNER JOIN CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion;
GO