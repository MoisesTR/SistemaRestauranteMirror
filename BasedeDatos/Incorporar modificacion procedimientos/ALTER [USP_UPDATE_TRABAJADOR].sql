USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_UPDATE_TRABAJADOR]    Script Date: 5/5/2018 07:03:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_UPDATE_TRABAJADOR](	
	@IdTrabajador	INT,
	@IdSucursal		INT NULL,
    @IdCargo		INT,
    @Nombres		NVARCHAR(50),
    @Apellidos		NVARCHAR(50),
	@IdTipoDocumento	INT,
    @Documento			NVARCHAR(50),
	@Imagen				NVARCHAR(50), 
    @FechaNacimiento	DATE,
    @Direccion			NVARCHAR(300),
	@Telefono1			NVARCHAR(20),
	@Telefono2			NVARCHAR(20),
    @FechaIngreso		DATE 
)
AS BEGIN 
	UPDATE TRABAJADOR SET IdSucursal=@IdSucursal,IdCargo=@IdCargo,nombres=@Nombres,Apellidos=@Apellidos, Imagen = @Imagen,
	IdTipoDocumento = @IdTipoDocumento,Documento=@Documento,FechaNacimiento=@FechaNacimiento,Direccion = @Direccion,Telefono1 = @Telefono1,
	Telefono2 = @Telefono2,FechaIngreso = @FechaIngreso,UpdateAt=GETDATE()
	WHERE IdTrabajador = @IdTrabajador

	
	IF EXISTS(SELECT 1 FROM USUARIO WHERE IdTrabajador = @IdTrabajador)
		UPDATE USUARIO SET Imagen = @Imagen FROM USUARIO WHERE IdTrabajador = @IdTrabajador

END

