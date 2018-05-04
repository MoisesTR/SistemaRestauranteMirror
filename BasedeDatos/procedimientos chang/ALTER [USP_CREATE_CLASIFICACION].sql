USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_CREATE_CLASIFICACION]    Script Date: 3/5/2018 17:50:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_CREATE_CLASIFICACION](
	@IdCategoria INT,
	@NombreClasificacion NVARCHAR(50),
    @DescripcionClasificacion NVARCHAR(150)
) AS BEGIN
	IF EXISTS(SELECT * from dbo.CLASIFICACION_PRODUCTO where NombreClasificacion = @NombreClasificacion) 
		BEGIN
 		RAISERROR('Clasificacion Duplicada, No se inserto.',16,1)
 		END
	ELSE
	BEGIN
		INSERT INTO dbo.CLASIFICACION_PRODUCTO(IdCategoria,NombreClasificacion,DescripcionClasificacion)
		VALUES(@IdCategoria,@NombreClasificacion,@DescripcionClasificacion);		
		SELECT @@IDENTITY AS IdClasificacion
     END
END 

