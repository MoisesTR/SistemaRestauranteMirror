USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_UPDATE_PROVEEDOR]    Script Date: 5/5/2018 05:03:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_UPDATE_PROVEEDOR](
	@IdProveedor	INT,
    @NombreProveedor NVARCHAR(50), -- NOT NULL,
    @Direccion		NVARCHAR(200),-- NOT NULL,
    @Email			NVARCHAR(100),-- NULL
    @Descripcion	NVARCHAR(200),-- NULL,
    @NombreRepresentante NVARCHAR(100), -- NOT NULL,
	@Telefono		NVARCHAR(20) , --NOT NULL
	@Retencion2		BIT NULL
) AS BEGIN
	UPDATE PROVEEDOR SET NombreProveedor=@NombreProveedor,Direccion=@Direccion,Email=@Email,Descripcion=@Descripcion,
    NombreRepresentante=ISNULL(@NombreRepresentante, NombreRepresentante),Telefono = @Telefono,
	Retencion2 = ISNULL(@Retencion2, Retencion2), UpdateAt=GETDATE() WHERE IdProveedor = @IdProveedor;
END 
