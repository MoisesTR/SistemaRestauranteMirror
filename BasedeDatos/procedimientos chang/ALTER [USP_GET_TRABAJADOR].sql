USE [pruebas_node]
GO
/****** Object:  StoredProcedure [dbo].[USP_GET_TRABAJADOR]    Script Date: 2/5/2018 19:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[USP_GET_TRABAJADOR](
	@IdTrabajador INT
)
AS BEGIN
	SELECT IdTrabajador,T.IdSucursal,S.NombreSucursal,T.IdCargo,C.NombreCargo,Nombres,Apellidos,IdTipoDocumento,Documento ,Imagen,FechaNacimiento,T.Direccion, T.Telefono1, T.Telefono2,FechaIngreso,T.Habilitado,T.CreatedAt,T.UpdateAt
	FROM TRABAJADOR T 
	INNER JOIN SUCURSAL S ON T.IdSucursal= S.IdSucursal
	INNER JOIN CARGO C ON T.IdCargo = C.IdCargo
	WHERE IdTrabajador = @IdTrabajador
END

