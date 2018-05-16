USE pruebas_node;


SELECT  * FROM TRABAJADOR
SELECT  * FROM ROL_USUARIO
SELECT  * FROM USUARIO
INSERT INTO TRABAJADOR VALUES(1,1,'Pedro','Sanchez','001-031196-0023E','',GETDATE(),'de donde fue el cine salinas 2 cuadras abajo , 1/2 al lago','224492774','ASDASDSA',GETDATE(),1,GETDATE(),GETDATE())
INSERT INTO ROL_USUARIO VALUES('Administrador','Administrador',1,GETDATE(),NULL)
INSERT INTO USUARIO VALUES(1,3,'usuario','pedro@hotmail.com','','$2a$10$z7b9HIddHmRvfD5.nY/hQuQaEthl28qBoGfMnuNNYNs.lQr5f/WfG',1,GETDATE(),GETDATE())
