
IF OBJECT_ID('USP_GET_CAMBIOS_FACTURA_BY_ID') IS NOT NULL
	DROP PROCEDURE USP_GET_CAMBIOS_FACTURA_BY_ID
GO
CREATE PROCEDURE USP_GET_CAMBIOS_FACTURA_BY_ID(
@IdFactura INT 
)
AS
BEGIN	
 
SELECT BF.IdFactura		
		, BF.IdUsuario
		, CreatedAt = CONVERT(VARCHAR(10),BF.CreatedAt,101)
		, BF.Descripcion
		, NombreUsuario = USU.Username
		, Hora = CONVERT(VARCHAR(10),BF.CreatedAt,108) + ' ' + RIGHT(CONVERT(VARCHAR(30), BF.CreatedAt, 9), 2) 
FROM	dbo.BITACORA_CAMBIOS_FACTURA BF
		INNER JOIN dbo.FACTURA_COMPRA FACT
			ON BF.IdFactura = FACT.IdFactura
		INNER JOIN dbo.USUARIO USU
			ON BF.IdUsuario = USU.IdUsuario
WHERE	BF.IdFactura = @IdFactura
ORDER BY BF.CreatedAt DESC

END

