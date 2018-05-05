USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_UNIDADES_DE_MEDIDA]    Script Date: 5/5/2018 03:03:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_UNIDADES_DE_MEDIDA]
--@Habilitado BIT  NULL
AS BEGIN
	--IF @Habilitado IS NULL
	--	SELECT  UNIDAD.IdUnidadMedida
	--			, UNIDAD.IdClasificacionUnidadMedida
	--			, CLASI_UNIDAD.NombreClasificacion
	--			, UNIDAD.NombreUnidad
	--			, UNIDAD.Simbolo
	--			, UNIDAD.Habilitado
	--			, UNIDAD.NImportancia 
	--	FROM	dbo.UNIDAD_MEDIDA UNIDAD 
	--			INNER JOIN dbo.CLASIFICACION_UNIDAD_MEDIDA CLASI_UNIDAD
	--	ON		UNIDAD.IdClasificacionUnidadMedida = CLASI_UNIDAD.IdClasificacionUnidadMedida
	--	ORDER BY UNIDAD.NImportancia DESC
	--ELSE
		SELECT  UNIDAD.IdUnidadMedida
				, UNIDAD.IdClasificacionUnidadMedida
				, CLASI_UNIDAD.NombreClasificacion
				, UNIDAD.NombreUnidad
				, UNIDAD.Simbolo
				, UNIDAD.Habilitado
				, UNIDAD.NImportancia 
		FROM	dbo.UNIDAD_MEDIDA UNIDAD 
				INNER JOIN dbo.CLASIFICACION_UNIDAD_MEDIDA CLASI_UNIDAD
		ON		UNIDAD.IdClasificacionUnidadMedida = CLASI_UNIDAD.IdClasificacionUnidadMedida
		WHERE UNIDAD.Habilitado = 1
		ORDER BY UNIDAD.NImportancia DESC
END

