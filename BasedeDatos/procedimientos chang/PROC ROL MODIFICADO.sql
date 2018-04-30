USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_UPDATE_ROL]    Script Date: 29/4/2018 02:42:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_UPDATE_ROL](
	@IdRol			INT,
	@NombreRol		NVARCHAR(50),
	@DescripcionRol NVARCHAR(150)
)
AS BEGIN
	UPDATE ROL_USUARIO SET NombreRol=@NombreRol,DescripcionRol=@DescripcionRol WHERE IdRol = @IdRol
END
