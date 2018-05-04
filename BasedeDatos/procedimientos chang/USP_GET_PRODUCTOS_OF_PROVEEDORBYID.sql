USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_PRODUCTOS_PROVEEDOR]    Script Date: 30/4/2018 19:13:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_PRODUCTOS_PROVEEDOR](
	@IdProveedor INT
) AS BEGIN
	SELECT *, Cantidad = 1, Descuento = 0, GravadoIva = 0 FROM V_ProductosDetallados WHERE IdProveedor = @IdProveedor;
END
