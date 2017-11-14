use pruebas_node;
GO
CREATE TABLE ROL_USUARIO(
	IdRol INT IDENTITY(1,1), 
	NombreRol NVARCHAR(50) NOT NULL,
	DescripcionRol NVARCHAR(150) NULL,
	Habilitado BIT NOT NULL DEFAULT 1,
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
IF OBJECT_ID('dbo.USP_GET_ROLES','P') IS NOT NULL
	DROP PROCEDURE USP_GET_ROLES
GO
CREATE PROCEDURE USP_GET_ROLES
AS BEGIN 
	SELECT IdRol,NombreRol,DescripcionRol,Habilitado FROM ROL_USUARIO
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
	@Username NVARCHAR(50),
	@Email NVARCHAR(100),
	@Password NVARCHAR(100)
)
AS BEGIN 
	INSERT INTO USUARIO(IdTrabajador,Username,Email,Password)
	VALUES(@IdTrabajador,@Username,@Email,@Password)
	SELECT IdUsuario,IdTrabajador,IdRol,Username,Email,Password FROM USUARIO WHERE IdTrabajador = @@IDENTITY
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIOS','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIOS
GO
CREATE PROCEDURE USP_GET_USUARIOS
AS BEGIN
	SELECT IdUsuario,IdTrabajador,IdRol,Username,Email,Password FROM USUARIO
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_ID','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_ID
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_ID(
	@IdUsuario INT
)
AS BEGIN 
	SELECT IdUsuario,IdTrabajador,IdRol,Username,Email,Password FROM USUARIO WHERE IdUsuario=@IdUsuario
END
GO
IF OBJECT_ID('dbo.USP_GET_USUARIO_BY_TRABAJADOR','P') IS NOT NULL
	DROP PROCEDURE USP_GET_USUARIO_BY_TRABAJADOR
GO
CREATE PROCEDURE USP_GET_USUARIO_BY_TRABAJADOR(
	@IdTrabajador INT
)
AS BEGIN
	SELECT IdUsuario,IdTrabajador,IdRol,Username,Email,Password FROM USUARIO WHERE IdTrabajador=@IdTrabajador
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