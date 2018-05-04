USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_UPDATE_CLASIFICACION]    Script Date: 3/5/2018 18:04:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_UPDATE_CLASIFICACION](
	@IdCategoria	  INT,
	@IdClasificacion  INT,
	@NombreClasificacion NVARCHAR(50),
    @DescripcionClasificacion NVARCHAR(150)
) 
AS BEGIN
	IF COALESCE(@IdCategoria, @NombreClasificacion, @DescripcionClasificacion) IS NOT NULL
		BEGIN
			UPDATE dbo.CLASIFICACION_PRODUCTO
			SET IdCategoria = ISNULL(@IdCategoria,IdCategoria),NombreClasificacion = ISNULL(@NombreClasificacion,NombreClasificacion),DescripcionClasificacion  = @DescripcionClasificacion,
				UpdateAt=GETDATE() where IdClasificacion = @IdClasificacion;
		END
END
