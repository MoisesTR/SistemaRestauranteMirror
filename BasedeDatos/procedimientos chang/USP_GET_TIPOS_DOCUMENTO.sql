USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_TRABAJADORES]    Script Date: 29/4/2018 19:46:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_GET_TIPOS_DOCUMENTOS](
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT	IdTipoDocumento
				, NombreTD
				, DescripcionTD
				, Habilitado
				, CreatedAt
		FROM	TIPO_DOCUMENTO T 
	ELSE
		SELECT	IdTipoDocumento
				, NombreTD
				, DescripcionTD
				, Habilitado
				, CreatedAt
		FROM	TIPO_DOCUMENTO T 
		WHERE T.Habilitado = @Habilitado
END
