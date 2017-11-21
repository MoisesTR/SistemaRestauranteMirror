use pruebas_node;
GO
CREATE TABLE ROL_USUARIO(
	IdRol INT IDENTITY(1,1), 
	NombreRol NVARCHAR(50) NOT NULL,
	DescripcionRol NVARCHAR(150) NULL,
	Habilitado BIT NOT NULL DEFAULT 1,
	CreateAt DATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt DATETIME NULL,
	CONSTRAINT PK_ROL_USUARIO PRIMARY KEY(IdRol),
	CONSTRAINT U_NOMBRE_ROL UNIQUE(NombreRol)
)
GO
IF OBJECT_ID('dbo.USP_CREATE_ROL_USUARIO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_ROL_USUARIO
GO
CREATE PROCEDURE USP_CREATE_ROL_USUARIO(
	@NombreRol NVARCHAR(50),
	@DescripcionRol NVARCHAR(150)
)
AS BEGIN
	INSERT INTO ROL_USUARIO(NombreRol,DescripcionRol)
	VALUES(@NombreRol,@DescripcionRol)

	SELECT @@IDENTITY AS IdRol
END
GO
IF OBJECT_ID('dbo.USP_UPDATE_ROL','P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_ROL
GO
CREATE PROCEDURE USP_UPDATE_ROL(
	@IdRol INT,
	@NombreRol NVARCHAR(50),
	@DescripcionRol NVARCHAR(150)
)
AS BEGIN
	UPDATE ROL_USUARIO SET NombreRol=@NombreRol,@DescripcionRol=@DescripcionRol WHERE IdRol = @IdRol
END
GO
IF OBJECT_ID('dbo.USP_GET_ROLES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ROLES
GO
CREATE PROCEDURE USP_GET_ROLES
	@Habilitado BIT NULL
AS BEGIN 
	IF @Habilitado IS NULL
		SELECT IdRol,NombreRol,DescripcionRol,Habilitado,CreateAt,UpdateAt FROM ROL_USUARIO
	ELSE
		SELECT IdRol,NombreRol,DescripcionRol,Habilitado,CreateAt,UpdateAt FROM ROL_USUARIO WHERE Habilitado=@Habilitado
END
GO
IF OBJECT_ID('dbo.USP_GET_ROL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ROL
GO
CREATE PROCEDURE USP_GET_ROL(
	@IdRol INT
)
AS BEGIN
	SELECT IdRol,NombreRol,DescripcionRol,Habilitado FROM ROL_USUARIO WHERE IdRol = @IdRol
END
GO
CREATE TABLE USUARIO(
	IdUsuario  INT IDENTITY(1,1),
	IdRol INT NOT NULL,
	IdTrabajador INT NULL,
	Username NVARCHAR(50) NOT NULL,
	Email NVARCHAR(100) NULL,
	Password NVARCHAR(100) NOT NULL,
	Habilitado BIT NOT NULL DEFAULT 1,
	CreateAt DATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt DATETIME NULL,
	CONSTRAINT pk_USUARIO PRIMARY KEY(IdUsuario),
	CONSTRAINT FK_USUARIO_ROL FOREIGN KEY(IdRol) REFERENCES ROL_USUARIO(IdRol),
	CONSTRAINT FK_USUARIO_TRABAJADOR FOREIGN KEY(IdTrabajador) REFERENCES TRABAJADOR(IdTrabajador)
)
GO
IF OBJECT_ID('dbo.USP_CREATE_USUARIO','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_USUARIO
GO
CREATE PROCEDURE USP_CREATE_USUARIO(
	@IdTrabajador INT,
	@IdRol INT,
	@Username NVARCHAR(50),
	@Email NVARCHAR(100),
	@Password NVARCHAR(100)
)
AS BEGIN 
	INSERT INTO USUARIO(IdRol,IdTrabajador,Username,Email,Password)
	VALUES(@IdRol,@IdTrabajador,@Username,@Email,@Password)

	SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,R.NombreRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdateAt
	FROM USUARIO U
	INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
	INNER JOIN CARGO C ON T.IdCargo= C.IdCargo
	INNER JOIN ROL_USUARIO R ON U.IdRol = R.IdRol
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIOS
GO
CREATE PROCEDURE USP_GET_USUARIOS(
	@Habilitado BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,R.NombreRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdateAt
		FROM USUARIO U
		INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
		INNER JOIN CARGO C ON T.IdCargo= C.IdCargo
		INNER JOIN ROL_USUARIO R ON U.IdRol = R.IdRol
	ELSE
		SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,R.NombreRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdateAt
		FROM USUARIO U
		INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
		INNER JOIN CARGO C ON T.IdCargo= C.IdCargo
		INNER JOIN ROL_USUARIO R ON U.IdRol = R.IdRol
		WHERE U.Habilitado = @Habilitado
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_ID','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_ID
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_ID(
	@IdUsuario INT
)
AS BEGIN 
	SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdateAt
	FROM USUARIO U
	INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
	INNER JOIN CARGO C ON T.IdCargo= C.IdCargo WHERE IdUsuario=@IdUsuario
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_TRABAJADOR(
	@IdTrabajador INT
)
AS BEGIN
	SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdateAt
	FROM USUARIO U
	INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
	INNER JOIN CARGO C ON T.IdCargo= C.IdCargo WHERE U.IdTrabajador = @IdTrabajador
END
GO
IF OBJECT_ID('dbo.USP_DISP_USUARIO','P') IS NOT NULL
	DROP PROCEDURE USP_DISP_USUARIO
GO
CREATE PROCEDURE USP_DISP_USUARIO(
	@IdUsuario INT,
	@Habilitado BIT
)
AS BEGIN
	UPDATE USUARIO SET Habilitado = @Habilitado WHERE IdUsuario= @IdUsuario
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_USERNAME_OR_EMAIL','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_USERNAME_OR_EMAIL
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_USERNAME_OR_EMAIL(
	@Username NVARCHAR(50),
	@Email NVARCHAR(100)
)
AS BEGIN 
	SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdateAt
	FROM USUARIO U
	INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
	INNER JOIN CARGO C ON T.IdCargo= C.IdCargo WHERE Username=@Username or Email = @Email
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_USERNAME','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_USERNAME
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_USERNAME(
	@Username NVARCHAR(50)
)
AS BEGIN 
	SELECT U.IdUsuario,U.IdTrabajador,T.Nombres,U.IdRol,C.NombreCargo,Username,Email,Password,U.Habilitado,U.CreateAt,U.UpdateAt
	FROM USUARIO U
	INNER JOIN TRABAJADOR T ON U.IdTrabajador = T.IdTrabajador
	INNER JOIN CARGO C ON T.IdCargo= C.IdCargo WHERE Username=@Username
END