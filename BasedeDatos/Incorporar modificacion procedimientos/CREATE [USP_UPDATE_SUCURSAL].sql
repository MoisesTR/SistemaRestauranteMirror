USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_UPDATE_PROVEEDOR]    Script Date: 5/5/2018 06:09:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_UPDATE_SUCURSAL](
	@IdSucursal	INT,
    @NombreSucursal NVARCHAR(100) ,
    @Direccion NVARCHAR(250) ,
	@Telefono1 NVARCHAR(20) ,
	@Telefono2 NVARCHAR(20) NULL
) AS BEGIN
	UPDATE SUCURSAL SET NombreSucursal=@NombreSucursal,Direccion=@Direccion,
    Telefono1 = @Telefono1,Telefono2 = ISNULL(@Telefono2, Telefono2), UpdateAt=GETDATE() 
	WHERE IdSucursal = @IdSucursal;
END 

