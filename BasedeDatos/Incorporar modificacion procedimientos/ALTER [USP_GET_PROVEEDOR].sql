USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_PROVEEDOR]    Script Date: 5/5/2018 05:02:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_PROVEEDOR](
	@IdProveedor INT
) AS BEGIN 
	SELECT IdProveedor,NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante,Telefono, Retencion2 FROM PROVEEDOR where IdProveedor = @IdProveedor;
END
