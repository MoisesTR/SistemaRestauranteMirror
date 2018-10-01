use pruebas_node;

INSERT INTO TRABAJADOR(IdSucursal,IdCargo,Nombres,Apellidos,IdTipoDocumento,Documento,Imagen,FechaNacimiento,Direccion,Telefono1,Telefono2,FechaIngreso) 
VALUES(1,1,'Cristian','Chang',1,'00111960028E','chang.jpg','19800101','Rubenia','87792956',NULL,GETDATE())

DECLARE @ID_TRABAJADOR INT = (SELECT TOP 1 IdTrabajador FROM TRABAJADOR ORDER BY 1 DESC)

--INSERT INTO ROL_USUARIO(NombreRol,DescripcionRol) 
--VALUES('Administrador','Acceso total al sistema')

DECLARE @ID_ROL_USUARIO INT = (SELECT TOP 1 IdRol FROM ROL_USUARIO ORDER BY 1 DESC)

INSERT INTO USUARIO(IdRol,IdTrabajador,Username,Email,Imagen,Password) 
VALUES(@ID_ROL_USUARIO,@ID_TRABAJADOR,'Chang','chang@gmail.com','chang.jpg','$2a$10$z7b9HIddHmRvfD5.nY/hQuQaEthl28qBoGfMnuNNYNs.lQr5f/WfG')


--UPDATE USUARIO SET Password = '$2a$10$z7b9HIddHmRvfD5.nY/hQuQaEthl28qBoGfMnuNNYNs.lQr5f/WfG' FROM USUARIO WHERE IdUsuario = 3

