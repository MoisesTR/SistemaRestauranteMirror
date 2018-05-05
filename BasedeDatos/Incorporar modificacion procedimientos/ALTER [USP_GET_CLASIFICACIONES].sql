USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_CLASIFICACIONES]    Script Date: 5/5/2018 05:48:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_CLASIFICACIONES]
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado IS NULL
		SELECT	CLASI.IdCategoria
				, CLASI.IdClasificacion
				, CLASI.NombreClasificacion
				, CLASI.DescripcionClasificacion
				, CLASI.Habilitado 
				, CATE.NombreCategoria
		FROM	dbo.CLASIFICACION_PRODUCTO CLASI
				INNER JOIN dbo.CATEGORIA_PRODUCTO CATE
		ON		CLASI.IdCategoria = CATE.IdCategoria
	ELSE
		SELECT	CLASI.IdCategoria
				, CLASI.IdClasificacion
				, CLASI.NombreClasificacion
				, CLASI.DescripcionClasificacion
				, CLASI.Habilitado 
				, CATE.NombreCategoria
		FROM	dbo.CLASIFICACION_PRODUCTO CLASI
				INNER JOIN dbo.CATEGORIA_PRODUCTO CATE
		ON		CLASI.IdCategoria = CATE.IdCategoria
		WHERE CLASI.Habilitado= @Habilitado
				AND CATE.Habilitado = @Habilitado
END
