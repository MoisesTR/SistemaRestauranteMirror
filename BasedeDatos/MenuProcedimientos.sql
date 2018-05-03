USE pruebas_node
GO
IF OBJECT_ID('USP_CREATE_MENU', 'P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_MENU
GO
CREATE PROCEDURE USP_CREATE_MENU(
	@IdMenu				INT		OUTPUT,
	@NombreM			NVARCHAR(50),
	@DescripcionM		NVARCHAR(150) NULL,
	@NOrden				INT
)
AS BEGIN
	IF NOT EXISTS(SELECT * FROM dbo.MENU WHERE NombreM = @NombreM) 
		BEGIN
			INSERT INTO dbo.MENU( NombreM, DescripcionM, NOrden)
			VALUES( @NombreM, @DescripcionM, @NOrden)
			SET @IdMenu = @@IDENTITY
		END
	ELSE
		BEGIN
			RAISERROR('Ya existe un menu con este nombre!',16,1);
		END
END
GO
IF OBJECT_ID('USP_UPDATE_MENU', 'P') IS NOT NULL
	DROP PROCEDURE USP_UPDATE_MENU
GO
CREATE PROCEDURE USP_UPDATE_MENU ( 
	@IdMenu				INT,
	@NombreM			NVARCHAR(50),
	@DescripcionM		NVARCHAR(150) NULL,
	@NOrden				INT
)
AS BEGIN
	IF NOT EXISTS(SELECT IdMenu FROM dbo.MENU WHERE IdMenu = @IdMenu)
		BEGIN
			RAISERROR('El Menu que desea editar no existe!',16,1)
		END
	ELSE
		BEGIN
				UPDATE dbo.MENU SET NombreM = ISNULL(@NombreM, NombreM), 
					DescripcionM = @DescripcionM, UpdatedAt = GETDATE()
				WHERE IdMenu = @IdMenu
		END
END
GO
IF  OBJECT_ID(N'dbo.USP_GET_MENUES','P')  IS NOT NULL
	DROP PROCEDURE dbo.USP_GET_MENUES
GO
CREATE PROCEDURE dbo.USP_GET_MENUES (
	@Habilitado		BIT NULL
)
AS BEGIN
	IF @Habilitado IS NULL
		BEGIN
			SELECT IdMenu, NombreM, DescripcionM, NOrden, Habilitado 
			FROM dbo.MENU
		END
	ELSE
		BEGIN
			SELECT IdMenu, NombreM, DescripcionM, NOrden, Habilitado 
			FROM dbo.MENU WHERE Habilitado = @Habilitado
		END
END
GO
IF OBJECT_ID(N'USP_CREATE_SUB_MENU','P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_SUB_MENU
GO
CREATE PROCEDURE dbo.USP_CREATE_SUB_MENU (
	@IdSubMenu		INT OUTPUT,
	@IdMenu			INT,
	@NombreSubM		NVARCHAR(50),
	@DescripcionSubM	NVARCHAR(150) NULL,
	@NOrden			INT
)
AS BEGIN
	IF EXISTS(SELECT IdMenu FROM dbo.MENU WHERE IdMenu = IdMenu)
	 BEGIN 
		INSERT INTO dbo.SUB_MENU(IdMenu, NombreSubM, DescripcionSubM, NOrden)
		VALUES(@IdMenu, @NombreSubM, @DescripcionSubM, NOrden)

		SET @IdSubMenu = @@IDENTITY;
	 END
	ELSE
		BEGIN
			RAISERROR('El Menu seleccionado no existe!',16,1);
		END
END
GO
IF OBJECT_ID(N'dbo.USP_UPDATE_SUB_MENU', 'P') IS NOT NULL
	DROP PROCEDURE dbo.USP_UPDATE_SUB_MENU
GO
CREATE PROCEDURE dbo.USP_UPDATE_SUB_MENU (
	@IdSubMenu		INT,
	@IdMenu			INT,
	@NombreSubM		NVARCHAR(50),
	@DescripcionSubM	NVARCHAR(150) NULL,
	@NOrden			INT
)
AS BEGIN
	IF EXISTS(SELECT IdMenu FROM dbo.MENU WHERE IdMenu = IdMenu)
	 BEGIN 
		UPDATE dbo.SUB_MENU SET IdMenu = ISNULL(@IdMenu, IdMenu), NombreSubM = ISNULL(@NombreSubM, NombreSubM), DescripcionSubM	= @DescripcionSubM, NOrden = ISNULL(@NOrden, NOrden)
		WHERE IdSubMenu = @IdSubMenu
	 END
	ELSE
		BEGIN
			RAISERROR('El Menu seleccionado no existe!',16,1);
		END
END
GO

IF OBJECT_ID(N'USP_CREATE_RELACION_SUBMENU_ROL','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_CREATE_RELACION_SUBMENU_ROL
GO
CREATE PROCEDURE dbo.USP_CREATE_RELACION_SUBMENU_ROL (
	@IdSubMenu		INT,
	@IdRol			INT
)
AS BEGIN
	IF EXISTS(SELECT IdSubMenu FROM dbo.SUB_MENU_PERTENECE_ROL WHERE IdSubMenu = @IdSubMenu AND IdRol = @IdRol AND Habilitado = 1) 
		BEGIN
			RAISERROR('El SubMenu y Rol seleccionado ya se encuentran relacionados!',16,1)
		END
	ELSE
		BEGIN
			INSERT INTO dbo.SUB_MENU_PERTENECE_ROL(IdSubMenu, IdRol)
			VALUES(@IdSubMenu, @IdRol)
		END
END
GO
IF OBJECT_ID(N'dbo.USP_DISAB_RELACION_SUBMENU_ROL','P') IS NOT NULL
	DROP PROCEDURE dbo.USP_DISAB_RELACION_SUBMENU_ROL
GO
CREATE PROCEDURE dbo.USP_DISAB_RELACION_SUBMENU_ROL (
	@IdSubMenu		INT,
	@IdRol			INT,
	@Habilitado		BIT
)
AS BEGIN
	IF NOT EXISTS(SELECT IdSubMenu FROM dbo.SUB_MENU_PERTENECE_ROL WHERE IdSubMenu = @IdSubMenu AND IdRol = @IdRol)
		BEGIN
			RAISERROR('No existe relacion entre el submenu y el rol!', 16,1)
		END
	ELSE 
		BEGIN
			UPDATE dbo.SUB_MENU_PERTENECE_ROL SET Habilitado = @Habilitado;
		END
END