USE pruebas_node;
GO
IF OBJECT_ID('dbo.V_ProductosDetallados','V') IS NOT NULL
	DROP VIEW dbo.V_ProductosDetallados
GO
CREATE VIEW dbo.V_ProductosDetallados
AS
SELECT	p.IdProducto,	p.NombreProducto,	p.Descripcion,	p.IdCategoria,	cp.NombreCategoria,
		p.IdSubClasificacion,	sp.NombreSubClasificacion,	cl.IdClasificacion,		cl.NombreClasificacion,
		p.IdEnvase,	e.NombreEnvase,		p.IdEmpaque,	em.NombreEmpaque,    p.CantidadEmpaque,
		p.Imagen,	p.IdUnidadMedida,	um.NombreUnidad,	p.ValorUnidadMedida,	p.IdEstado,
		ep.Nombre,	p.Habilitado,		P.DiasCaducidad,	P.CreatedAt,P.UpdateAt
    FROM Producto p 
	INNER JOIN CATEGORIA_PRODUCTO cp 
		ON	p.IdCategoria = cp.IdCategoria
    INNER JOIN SUBCLASIFICACION_PRODUCTO sp 
		ON	p.IdSubClasificacion = sp.IdSubClasificacion
    INNER JOIN CLASIFICACION_PRODUCTO cl 
		ON	sp.IdClasificacion = cl.IdClasificacion
    LEFT JOIN ENVASE e 
		ON	p.IdEnvase = e.IdEnvase
    LEFT JOIN EMPAQUE em 
		ON	p.IdEmpaque = em.IdEmpaque
    INNER JOIN UNIDAD_MEDIDA um 
		ON	p.IdUnidadMedida = um.IdUnidadMedida
    INNER JOIN ESTADO_PRODUCTO ep 
		ON	p.IdEstado = ep.IdEstado;
GO
IF OBJECT_ID('V_SUBCLASIFICACIONES','V') IS NOT NULL
	DROP VIEW V_SUBCLASIFICACIONES
GO
CREATE VIEW V_SUBCLASIFICACIONES
AS
SELECT s.IdSubClasificacion,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado FROM SUBCLASIFICACION_PRODUCTO s
    INNER JOIN CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion;
GO