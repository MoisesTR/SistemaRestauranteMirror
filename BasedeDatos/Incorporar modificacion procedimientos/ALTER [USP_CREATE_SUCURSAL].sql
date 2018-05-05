USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_CREATE_SUCURSAL]    Script Date: 5/5/2018 05:50:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_CREATE_SUCURSAL](
    @NombreSucursal NVARCHAR(100) ,
    @Direccion NVARCHAR(250) ,
	@Telefono1 NVARCHAR(20) ,
	@Telefono2 NVARCHAR(20) NULL
)
AS BEGIN 
	INSERT INTO dbo.SUCURSAL(NombreSucursal,Direccion,Telefono1,Telefono2)
	VALUES(@NombreSucursal,@Direccion,@Telefono1,@Telefono2)
	SELECT @@IDENTITY AS IdSucursal
END
