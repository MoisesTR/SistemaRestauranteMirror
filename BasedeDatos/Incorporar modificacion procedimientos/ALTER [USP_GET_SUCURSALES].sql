USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_SUCURSALES]    Script Date: 5/5/2018 06:07:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_SUCURSALES]
	@Habilitado BIT NULL
AS 
	IF @Habilitado IS NULL
		SELECT IdSucursal,NombreSucursal,Direccion,Telefono1,Telefono2 from dbo.SUCURSAL
	ELSE
		SELECT IdSucursal,NombreSucursal,Direccion,Telefono1,Telefono2 from dbo.SUCURSAL WHERE Habilitado = @Habilitado
