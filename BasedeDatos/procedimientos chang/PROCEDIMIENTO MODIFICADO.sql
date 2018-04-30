USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_CREATE_SUBCLASIFICACION]    Script Date: 6/4/2018 19:34:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_CREATE_SUBCLASIFICACION](
	@IdClasificacion INT,
    @NombreSubClasificacion NVARCHAR(50),
    @DescripcionSubClasificacion NVARCHAR(150)
) AS BEGIN
	IF NOT EXISTS(SELECT * FROM CLASIFICACION_PRODUCTO where IdClasificacion = @IdClasificacion)
		RAISERROR('La Clasificacion Insertada no se encontro, por lo tanto no se inserto la Subclasificacion.',16,1);
    ELSE
		BEGIN
		INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombreSubclasificacion,DescripcionSubclasificacion)
        VALUES(@IdClasificacion,@NombreSubClasificacion,@DescripcionSubClasificacion);
		SELECT @@IDENTITY AS IdSubClasificacion
		END
END
