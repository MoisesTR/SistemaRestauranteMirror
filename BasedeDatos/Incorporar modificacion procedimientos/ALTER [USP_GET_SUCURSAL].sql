USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_SUCURSAL]    Script Date: 5/5/2018 06:09:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_SUCURSAL]
	@IdSucursal INT
AS 
	SELECT IdSucursal,NombreSucursal,Direccion,Telefono1,Telefono2 from dbo.SUCURSAL WHERE IdSucursal = @IdSucursal
