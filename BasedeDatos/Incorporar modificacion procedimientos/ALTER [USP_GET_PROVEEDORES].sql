USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_PROVEEDORES]    Script Date: 5/5/2018 04:59:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_PROVEEDORES]
	@Habilitado BIT NULL
AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdProveedor
				, NombreProveedor
				, Direccion
				, Email
				, Descripcion
				, NombreRepresentante
				, Telefono
				, Retencion2 
		FROM	PROVEEDOR;
	ELSE
		SELECT IdProveedor
				, NombreProveedor
				, Direccion
				, Email
				, Descripcion
				, NombreRepresentante
				, Telefono
				, Retencion2 
		FROM	PROVEEDOR
		WHERE Habilitado = @Habilitado;
END