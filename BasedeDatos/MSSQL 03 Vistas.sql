CREATE VIEW V_ProductosDetallados
AS
SELECT p.IdProducto,p.NombreProducto,p.Costo,p.Descripcion,p.IdCategoria,cp.NombreCategoria,p.IdSubClasificacion,
    sp.NombreSubClasificacion,cl.IdClasificacion,cl.NombreClasificacion,p.IdEnvase,e.NombreEnvase,p.IdEmpaque,em.NombreEmpaque,
    p.CantidadEmpaque,p.Imagen,p.IdUnidadMedida,um.NombreUnidad,p.ValorUnidadMedida,p.IdEstado,ep.Nombre,
    p.IdProveedor,pp.NombreProveedor
    FROM Producto p INNER JOIN CATEGORIA_PRODUCTO cp ON p.IdCategoria = cp.IdCategoria
    INNER JOIN SUBCLASIFICACION_PRODUCTO sp ON p.IdSubClasificacion = sp.IdSubClasificacion
    INNER JOIN CLASIFICACION_PRODUCTO cl ON sp.IdClasificacion = cl.IdClasificacion
    LEFT JOIN ENVASE e ON p.IdEnvase = e.IdEnvase
    LEFT JOIN EMPAQUE em ON p.IdEmpaque = em.IdEmpaque
    INNER JOIN UNIDAD_MEDIDA um ON p.IdUnidadMedida = um.IdUnidadMedida
    INNER JOIN ESTADO_PRODUCTO ep ON p.IdEstado = ep.IdEstado
    INNER JOIN PROVEEDOR pp ON p.IdProveedor = pp.IdProveedor;
GO