USE [pruebas_node]
GO
CREATE PROCEDURE [dbo].[USP_GET_FACTURA_BY_ID](
@IdFactura INT 
)
AS
BEGIN
SELECT FACT.IdFactura
		, FACT.Serie
		, FACT.NumRefFactura
		, FACT.IdProveedor
		, FACT.IdTrabajador
		, IdEstadoFactura
		, TRA.Nombres +' ' + TRA.Apellidos AS [TrabajadorIngreso]
		, Hora = CONVERT(VARCHAR(10),FACT.CreatedAt,108) + ' ' + RIGHT(CONVERT(VARCHAR(30), FACT.CreatedAt, 9), 2) 
		, PRO.NombreProveedor
		, FACT.NombVendedor
		, FACT.FechaIngreso
		, FechaIngresoFormato = CONVERT(VARCHAR(8),FACT.FechaIngreso,103)
		, FACT.SubTotal
		, FACT.TotalIva
		, FACT.CambioActual
		, FACT.TotalDescuento
		, FACT.TotalCordobas
		, FACT.Retencion 
		, FACT.Habilitado
		, FACT.CreatedAt
		, FACT.UpdateAt	
    , Detalle = (
        SELECT	DETA.IdDetalle
				, DETA.IdFactura
				, PRO.IdProducto
				, PRO.NombreProducto
				, UM.NombreUnidad
				, DETA.PrecioUnitario
				, DETA.Cantidad
				, DETA.GravadoIva
				, DETA.SubTotal
				, DETA.SubTotal_Cal
				, DETA.Iva
				, DETA.Iva_Cal
				, DETA.Descuento
				, DETA.TotalDetalle
				, DETA.Total_Cal
				, DETA.Bonificacion
				, DETA.Habilitado
				, DETA.CreatedAt
				, DETA.UpdateAt
		FROM	dbo.DETALLE_FACTURA_COMPRA DETA
				INNER JOIN dbo.PRODUCTO PRO
					ON DETA.IdProducto = PRO.IdProducto
				INNER JOIN dbo.UNIDAD_MEDIDA UM
					ON PRO.IdUnidadMedida = UM.IdUnidadMedida
		WHERE	 DETA.IdFactura = FACT.IdFactura
        FOR JSON PATH
    )
FROM	dbo.FACTURA_COMPRA FACT
	INNER JOIN dbo.TRABAJADOR TRA
		ON FACT.IdTrabajador = TRA.IdTrabajador
	INNER JOIN dbo.PROVEEDOR PRO
		ON FACT.IdProveedor = PRO.IdProveedor
WHERE	FACT.IdFactura = @IdFactura
FOR JSON PATH , ROOT('Factura')
END

--SELECT * FROM FACTURA_COMPRA
--EXEC USP_GET_FACTURA_BY_ID 4