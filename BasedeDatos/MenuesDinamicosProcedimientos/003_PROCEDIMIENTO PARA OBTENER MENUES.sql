--SELECT ROL.IdRol
--		, RE.Nombre
--		, RE.Descripcion
--		, RE.Habilitado
--		, RE.Ruta
--		, RE.Icono
--		, RE.
--		, RE.Orden
--    ,Submenues = (
--        SELECT	ROL.IdRol
--		, RES.Nombre
--		, RES.Descripcion
--		, RES.Habilitado
--		, RES.IdMenuPadre
--		, RES.Ruta
--		, RES.Icono
--		, RES.Orden
--		FROM	dbo.ROL_USUARIO ROLS
--				INNER JOIN dbo.ROL_RECURSO_SISTEMA RSS
--					ON ROLS.IdRol = RSS.IdRol
--				INNER JOIN dbo.RECURSO_SISTEMA RES
--					ON RES.IdRecursoSistema = RSS.IdRecursoSistema
--		WHERE	 ROLS.IdRol = ROL.IdRol
--				 AND RES.IdMenuPadre = RE.IdRecursoSistema
--        FOR JSON PATH
--    )
--FROM	dbo.ROL_USUARIO ROL
--		INNER JOIN dbo.ROL_RECURSO_SISTEMA RS
--			ON ROL.IdRol = RS.IdRol
--		INNER JOIN dbo.RECURSO_SISTEMA RE
--			ON RE.IdRecursoSistema = RS.IdRecursoSistema
--WHERE	 ROL.IdRol = 1
--		AND RE.IdMenuPadre IS NULL
--FOR JSON PATH, ROOT('Menues')


--EXEC USP_GET_MENUES 1

IF OBJECT_ID('USP_GET_MENUES') IS NOT NULL
	DROP PROCEDURE USP_GET_MENUES
GO
CREATE PROCEDURE USP_GET_MENUES(
@IdRol INT 
)
AS
BEGIN
SELECT ROL.IdRol
		, RE.Nombre
		, RE.Descripcion
		, RE.Habilitado
		, RE.Ruta
		, RE.Icono
		, Re.Clase
		, RE.Orden
    ,Submenues = (
        SELECT	ROL.IdRol
		, RES.Nombre
		, RES.Descripcion
		, RES.Habilitado
		, RES.IdMenuPadre
		, RES.Ruta
		, RES.Icono
		, RES.Orden
		FROM	dbo.ROL_USUARIO ROLS
				INNER JOIN dbo.ROL_RECURSO_SISTEMA RSS
					ON ROLS.IdRol = RSS.IdRol
				INNER JOIN dbo.RECURSO_SISTEMA RES
					ON RES.IdRecursoSistema = RSS.IdRecursoSistema
		WHERE	 ROLS.IdRol = ROL.IdRol
				 AND RES.IdMenuPadre = RE.IdRecursoSistema
		ORDER BY RES.Orden ASC
        FOR JSON PATH
    )
FROM	dbo.ROL_USUARIO ROL
		INNER JOIN dbo.ROL_RECURSO_SISTEMA RS
			ON ROL.IdRol = RS.IdRol
		INNER JOIN dbo.RECURSO_SISTEMA RE
			ON RE.IdRecursoSistema = RS.IdRecursoSistema
WHERE	 ROL.IdRol = @IdRol
		AND RE.IdMenuPadre IS NULL
ORDER BY RE.Orden ASC
FOR JSON PATH , ROOT('Menues')
END

