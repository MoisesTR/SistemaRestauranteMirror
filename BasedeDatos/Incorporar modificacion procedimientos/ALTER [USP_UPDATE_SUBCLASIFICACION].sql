USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_UPDATE_SUBCLASIFICACION]    Script Date: 5/5/2018 05:36:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_UPDATE_SUBCLASIFICACION](
	@IdSubClasificacion INT,
    @IdClasificacion INT NULL,
	@NombreSubClasificacion NVARCHAR(50)  NULL,
    @DescripcionSubClasificacion NVARCHAR(150) NULL
) AS BEGIN
	IF COALESCE(@IdSubClasificacion, @NombreSubClasificacion, @DescripcionSubClasificacion) IS NOT NULL
		BEGIN
			UPDATE SUBCLASIFICACION_PRODUCTO
			SET IdClasificacion= ISNULL(@IdClasificacion,IdClasificacion)
			,NombreSubClasificacion = ISNULL(@NombreSubClasificacion, NombreSubClasificacion),DescripcionSubClasificacion  = ISNULL(@DescripcionSubClasificacion,DescripcionSubclasificacion),UpdateAt=GETDATE() 
			WHERE IdSubClasificacion = @IdSubClasificacion;
		END
END 
