USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_CREATE_PROVEEDOR]    Script Date: 5/5/2018 04:53:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_CREATE_PROVEEDOR](
	@NombreProveedor NVARCHAR(50), -- NOT NULL,
    @Direccion NVARCHAR(200),-- NOT NULL,
    @Email NVARCHAR(100),-- NULL
    @Descripcion NVARCHAR(200),-- NULL,
    @NombreRepresentante NVARCHAR(100), -- NOT NULL,
	@Telefono NVARCHAR(20), --NOT NULL
	@Retencion2	BIT NULL
) AS BEGIN
	INSERT INTO PROVEEDOR(NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante,Telefono, Retencion2)
    VALUES(@NombreProveedor,@Direccion,@Email,@Descripcion,@NombreRepresentante,@Telefono,@Retencion2);
	SELECT @@IDENTITY AS IdProveedor
END 
