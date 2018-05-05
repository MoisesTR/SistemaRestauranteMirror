USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_SUBCLASIFICACIONES]    Script Date: 5/5/2018 05:33:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Nombre anterios USP_ListSubClasificaciones 
ALTER PROCEDURE [dbo].[USP_GET_SUBCLASIFICACIONES] 
	@Habilitado BIT  NULL
AS BEGIN
	IF @Habilitado IS NULL
		SELECT s.IdSubClasificacion
		,s.NombreSubClasificacion,s.DescripcionSubClasificacion,s.IdClasificacion,c.NombreClasificacion,s.Habilitado,s.CreatedAt,s.UpdateAt FROM SUBCLASIFICACION_PRODUCTO s
		INNER JOIN dbo.CLASIFICACION_PRODUCTO c ON s.IdClasificacion = c.IdClasificacion
	ELSE
		SELECT	s.IdSubClasificacion
				,s.NombreSubClasificacion
				,s.DescripcionSubClasificacion
				,s.IdClasificacion
				,c.NombreClasificacion
				,s.Habilitado
				,s.CreatedAt
				,s.UpdateAt 
		FROM	SUBCLASIFICACION_PRODUCTO s
				INNER JOIN dbo.CLASIFICACION_PRODUCTO c 
					ON s.IdClasificacion = c.IdClasificacion 
		WHERE c.Habilitado = @Habilitado
				AND s.Habilitado = @Habilitado
END
