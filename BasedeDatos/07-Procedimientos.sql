USE pruebas_node
GO
IF OBJECT_ID('USP_CREATE_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_CARGO
GO
CREATE PROCEDURE USP_CREATE_CARGO(
	@NombreCargo NVARCHAR(50),
    @DescripcionCargo NVARCHAR(150)
)
AS BEGIN
	INSERT INTO CARGO(NombreCargo,DescripcionCargo)
	VALUES(@NombreCargo,@DescripcionCargo)
END
GO
IF OBJECT_ID('USP_UPDATE_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_CARGO
GO
CREATE PROCEDURE USP_UPDATE_CARGO(
	@IdCargo INT,
	@NombreCargo NVARCHAR(50),
    @DescripcionCargo NVARCHAR(150)
)
AS BEGIN
	UPDATE CARGO SET NombreCargo=@NombreCargo,DescripcionCargo=@DescripcionCargo
	WHERE IdCargo = @IdCargo
END
GO
IF OBJECT_ID('USP_GET_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CARGO
GO
CREATE PROCEDURE USP_GET_CARGO(
	@IdCargo INT
)
AS BEGIN
	SELECT IdCargo,NombreCargo,DescripcionCargo,Habilitado,CreatedAt,UpdateAt 
	FROM CARGO WHERE IdCargo = @IdCargo
END
go
IF OBJECT_ID('USP_GET_CARGOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_CARGOS
GO
CREATE PROCEDURE USP_GET_CARGOS(
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdCargo,NombreCargo,DescripcionCargo,Habilitado,CreatedAt,UpdateAt FROM CARGO
	ELSE
		SELECT IdCargo,NombreCargo,DescripcionCargo,Habilitado,CreatedAt,UpdateAt FROM CARGO
		WHERE Habilitado=@Habilitado
END
GO
IF OBJECT_ID('USP_DISP_CARGO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_CARGO
GO
CREATE PROCEDURE USP_DISP_CARGO(
	@IdCargo INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE CARGO SET Habilitado = @Habilitado,UpdateAt=GETDATE() WHERE IdCargo=@IdCargo
END
GO
IF OBJECT_ID('USP_GET_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_TRABAJADOR(
	@IdTrabajador INT
)
AS BEGIN
	SELECT IdTrabajador,T.IdSucursal,S.NombreSucursal,T.IdCargo,C.NombreCargo,Nombres,Apellidos,NumeroCedula,FechaNacimiento,T.Direccion,FechaIngreso,T.Habilitado,T.CreatedAt,T.UpdateAt
	FROM TRABAJADOR T 
	INNER JOIN SUCURSAL S ON T.IdSucursal= S.IdSucursal
	INNER JOIN CARGO C ON T.IdCargo = C.IdCargo
	WHERE IdTrabajador = @IdTrabajador
END
go
IF OBJECT_ID('USP_GET_TRABAJADORES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TRABAJADORES
GO
CREATE PROCEDURE USP_GET_TRABAJADORES(
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdTrabajador,T.IdSucursal,S.NombreSucursal,T.IdCargo,C.NombreCargo,Nombres,Apellidos,NumeroCedula,FechaNacimiento,T.Direccion,FechaIngreso,T.Habilitado,T.CreatedAt,T.UpdateAt
		FROM TRABAJADOR T 
		INNER JOIN SUCURSAL S ON T.IdSucursal= S.IdSucursal
		INNER JOIN CARGO C ON T.IdCargo = C.IdCargo
	ELSE
		SELECT IdTrabajador,T.IdSucursal,S.NombreSucursal,T.IdCargo,C.NombreCargo,Nombres,Apellidos,NumeroCedula,FechaNacimiento,T.Direccion,FechaIngreso,T.Habilitado,T.CreatedAt,T.UpdateAt
		FROM TRABAJADOR T 
		INNER JOIN SUCURSAL S ON T.IdSucursal= S.IdSucursal
		INNER JOIN CARGO C ON T.IdCargo = C.IdCargo
		WHERE T.Habilitado = @Habilitado
END
GO
IF OBJECT_ID('USP_DISP_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_TRABAJADOR
GO
CREATE PROCEDURE USP_DISP_TRABAJADOR(
	@IdTrabajador INT,
	@Habilitado BIT
) AS BEGIN
	UPDATE TRABAJADOR SET Habilitado = @Habilitado,UpdateAt=GETDATE() WHERE IdTrabajador=@IdTrabajador
END
GO
IF OBJECT_ID('USP_GET_TELEFONOS_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TELEFONOS_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_TELEFONOS_TRABAJADOR(
	@IdTrabajador INT,
	@Habilitado BIT
) AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdTelefonoTrabajador,IdTrabajador,TT.IdOperadora,OT.Abreviacion,OT.Nombre,NumeroTelefono,TT.Habilitado,TT.CreatedAt,TT.UpdateAt 
		FROM TELEFONO_TRABAJADOR TT
		INNER JOIN OPERADORA_TELEFONICA OT ON OT.IdOperadora = TT.IdOperadora
		WHERE TT.IdTrabajador= @IdTrabajador
	ELSE
		SELECT IdTelefonoTrabajador,IdTrabajador,TT.IdOperadora,OT.Abreviacion,OT.Nombre,NumeroTelefono,TT.Habilitado,TT.CreatedAt,TT.UpdateAt 
		FROM TELEFONO_TRABAJADOR TT
		INNER JOIN OPERADORA_TELEFONICA OT ON OT.IdOperadora = TT.IdOperadora
		WHERE TT.IdTrabajador= @IdTrabajador AND TT.Habilitado= @Habilitado
END
GO
IF OBJECT_ID('USP_GET_TELEFONOS_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TELEFONOS_SUCURSAL
GO
CREATE PROCEDURE USP_GET_TELEFONOS_SUCURSAL(
	@IdSucursal INT,
	@Habilitado BIT
) AS BEGIN
	IF @Habilitado IS NULL
		SELECT IdTelefonoSucursal,IdSucursal,TS.IdOperadora,OT.Abreviacion,OT.Nombre,NumeroTelefono,TS.Habilitado,TS.CreatedAt,TS.UpdateAt 
		FROM TELEFONO_SUCURSAL TS
		INNER JOIN OPERADORA_TELEFONICA OT ON OT.IdOperadora = TS.IdOperadora
		WHERE TS.IdSucursal= @IdSucursal
	ELSE
		SELECT IdTelefonoSucursal,IdSucursal,TS.IdOperadora,OT.Abreviacion,OT.Nombre,NumeroTelefono,TS.Habilitado,TS.CreatedAt,TS.UpdateAt 
		FROM TELEFONO_SUCURSAL TS
		INNER JOIN OPERADORA_TELEFONICA OT ON OT.IdOperadora = TS.IdOperadora
		WHERE TS.IdSucursal= @IdSucursal AND TS.Habilitado= @Habilitado
END
GO
IF OBJECT_ID('USP_GET_TELEFONO_SUCURSAL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TELEFONO_SUCURSAL
GO
CREATE PROCEDURE USP_GET_TELEFONO_SUCURSAL(
	@IdTelefonoSucursal INT,
	@IdSucursal INT
) AS BEGIN
		SELECT IdTelefonoSucursal,IdSucursal,TS.IdOperadora,OT.Abreviacion,OT.Nombre,NumeroTelefono,TS.Habilitado,TS.CreatedAt,TS.UpdateAt 
		FROM TELEFONO_SUCURSAL TS
		INNER JOIN OPERADORA_TELEFONICA OT ON OT.IdOperadora = TS.IdOperadora
		WHERE TS.IdSucursal= @IdSucursal AND IdTelefonoSucursal= @IdTelefonoSucursal
END
GO
IF OBJECT_ID('USP_GET_TELEFONO_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_TELEFONO_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_TELEFONO_TRABAJADOR(
	@IdTelefonoTrabajador INT,
	@IdTrabajador INT
) AS BEGIN
		SELECT IdTelefonoTrabajador,IdTrabajador,TT.IdOperadora,OT.Abreviacion,OT.Nombre,NumeroTelefono,TT.Habilitado,TT.CreatedAt,TT.UpdateAt 
		FROM TELEFONO_TRABAJADOR TT
		INNER JOIN OPERADORA_TELEFONICA OT ON OT.IdOperadora = TT.IdOperadora
		WHERE TT.IdTrabajador= @IdTrabajador AND IdTelefonoTrabajador = @IdTelefonoTrabajador
END