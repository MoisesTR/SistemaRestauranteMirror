CREATE DATABASE pruebas_node;
GO
USE pruebas_node;
GO
CREATE TABLE PROCEDENCIA_PRODUCTO(
	IdProcedencia int IDENTITY(1,1),
    Nombre NVARCHAR(50) not null,
    Descripcion NVARCHAR(150) null,
    Habilitado bit default 1 not null,
    constraint pk_Procedencia primary key(IdProcedencia)
);
GO
INSERT INTO PROCEDENCIA_PRODUCTO(Nombre,Descripcion)
VALUES	('Proveedor','Productos que ingresan directo del proveedor.')
		,('Mercado','Productos que se compran en el mercado.')
        ,('Bodega central','Productos que provienen de la bodega central.')
        ,('Area de Produccion','Productos que se elabora en la planta de produccion.')
        ,('Traslado Bodega Central','Productos que provienen de la Bodega central.');
GO
CREATE TABLE USO_PRODUCTO(
	IdUso int IDENTITY(1,1),
    Nombre NVARCHAR(50) not null,
    Descripcion NVARCHAR(150) null,
    Habilitado bit default 1 not null,
    constraint pk_USO_PRODUCTO primary key(IdUso),
    CONSTRAINT U_USO_PRODUCTO UNIQUE(Nombre)
);
GO
INSERT INTO USO_PRODUCTO(Nombre,Descripcion)
VALUES	('Nuevo/Sin Usar','Producto que no se ha usado.')
		,('En Uso','Producto que se esta usando.')
        ,('Usado/Agotado','Producto que se uso hasta agotarse.');

CREATE TABLE MOTIVO_BAJA_PRODUCTO(
	IdMotivo INT IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Habilitado bit default 1 not null,
    CONSTRAINT PK_MOTIVO_BAJA_PRODUCTO PRIMARY KEY(IdMotivo)
);

INSERT INTO MOTIVO_BAJA_PRODUCTO(Nombre,Descripcion) 
VALUES	('Extravio','El/Los productos se extraviaron')
		,('Vencimiento','El/Los productos se vencieron.')
        ,('Robo','El/Los productos fueron robados')
        ,('Accidente','El/Los productos se hecho a perder en un accidente.')
        ,('Venta','El/Los PRODUCTOs fueron vendidos.');

CREATE TABLE CARGO(
    IdCargo INT IDENTITY(1,1),
    NombreCargo NVARCHAR(50) NOT NULL,
    DrescripcionCargo NVARCHAR(100),
    Habilitado Bit default 1 not null,    
    CONSTRAINT PK_IdCargo PRIMARY KEY (IdCargo)
);

INSERT INTO CARGO(NombreCargo,DrescripcionCargo) 
VALUES ('Propietario','Propietario del restaurante')
		,('Gerente','')
        ,('Chofer','')
        ,('Bodeguero','Encargado del manejo de los inventarios.')
        ,('Encargado de Sucursal','Encargado del funcionamiento de la Sucursal.');

CREATE TABLE OPERADORA_TELEFONICA(
	IdOperadora int IDENTITY(1,1),
    Nombre NVARCHAR(50),
    Abreviacion NVARCHAR(3),
    Habilitado Bit default 1 not null,
    constraint pk_IdOPERADORA_TELEFONICA primary key(IdOperadora)
);

INSERT INTO OPERADORA_TELEFONICA(Nombre,Abreviacion)
VALUES	('Claro','Cl')
		,('Movistar','Mv')
        ,('Cootel','Co');

CREATE TABLE PROVEEDOR(
    IdProveedor INT IDENTITY(1,1),
    NombreProveedor NVARCHAR(50) NOT NULL,
    Direccion NVARCHAR(200) NOT NULL,
    Email NVARCHAR(100) NULL,
    Descripcion NVARCHAR(200) NULL,
    NombreRepresentante NVARCHAR(100) NOT NULL,
    Habilitado Bit default 1,
    CONSTRAINT PK_IdProveedor PRIMARY KEY (IdProveedor)
);

INSERT INTO PROVEEDOR(NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante) 
VALUES	('Cargil','de la uni 2c al sas','esteesun@correo.com','descripcion','Representante')
		,('Monisa','Managua, asdasd asdas ','esteesun@correo.com','descripcion','Representante')
		,('Insumos Chinos','asdasda sdasdsa asd','esteesun@correo.com','descripcion','Representante');

CREATE TABLE NUMERO_TELEFONO_PROVEEDOR(
    IdNumero INT IDENTITY(1,1),
    IdProveedor INT,
    Prefijo NVARCHAR(3),
    NumeroTelefono NVARCHAR(50) not null,
    Habilitado Bit default 1,
    CONSTRAINT Fk_ProveedorTele FOREIGN KEY (IdProveedor)
        REFERENCES Proveedor (IdProveedor),
	CONSTRAINT PK_IdNumeroTelefProv PRIMARY KEY (IdNumero,IdProveedor)
);

INSERT INTO NUMERO_TELEFONO_PROVEEDOR(IdProveedor,NumeroTelefono) 
VALUES	(1,'2279-9245')
		,(1,'782323239')
		,(2,'58556641')
		,(3,'322578734');

CREATE TABLE CLASIFICACION_UNIDAD_MEDIDA (
    IdClasificacionUnidadMedida INT IDENTITY(1,1),
    NombreClasificacion NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(150) NULL,
    Habilitado Bit default 1,
    CONSTRAINT PK_ID_CLAS_UDM PRIMARY KEY (IdClasificacionUnidadMedida)
);

INSERT INTO CLASIFICACION_UNIDAD_MEDIDA(NombreClasificacion,Descripcion) 
VALUES	('Masa','Miden el peso del producto.')
		,('Volumen','Miden el espacio que ocupa el producto.');

CREATE TABLE UNIDAD_MEDIDA (
    IdUnidadMedida INT IDENTITY(1,1),
    IdClasificacionUnidadMedida INT,
    NombreUnidad NVARCHAR(50) NOT NULL,
    Simbolo NVARCHAR(3) NULL,
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_ID_UDM PRIMARY KEY (IdUnidadMedida),
    CONSTRAINT FK_CLAS_UDM FOREIGN KEY (IdClasificacionUnidadMedida)
        REFERENCES CLASIFICACION_UNIDAD_MEDIDA (IdClasificacionUnidadMedida)
);

INSERT INTO UNIDAD_MEDIDA(IdClasificacionUnidadMedida,NombreUnidad,Simbolo) 
VALUES	(1,'Libra','Lb')
		,(1,'Kilogramo','Kg')
		,(2,'Litro','Lt')
		,(2,'Mililitro','Ml')
		,(1,'Miligramo','Mg');

CREATE TABLE CLASIFICACION_PRODUCTO (
    IdClasificacion INT IDENTITY(1,1),
    NombreClasificacion NVARCHAR(50) NOT NULL,
    DescripcionClasificacion NVARCHAR(100),
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_CLASIFPRODUCT PRIMARY KEY (IdClasificacion),
    CONSTRAINT U_NOMBRECLASIF UNIQUE(NombreClasificacion)
);

INSERT INTO CLASIFICACION_PRODUCTO(NombreClasificacion,DescripcionClasificacion) 
VALUES	('Pollo','Las distintas cortes de pollo.')
		,('Pastas','Distintos tipos de pasta');

CREATE TABLE SUBCLASIFICACION_PRODUCTO (
    IdSubclasificacion INT IDENTITY(1,1),
    IdClasificacion INT,
    NombreSubclasificacion NVARCHAR(50),
    DescripcionSubclasificacion NVARCHAR(150),
    Habilitado Bit default 1 not null,
    CONSTRAINT Pk_IdSubClasfProdu PRIMARY KEY (IdSubclasificacion),
    CONSTRAINT FK_SUBCLAS_CLAS FOREIGN KEY (IdClasificacion)
        REFERENCES CLASIFICACION_PRODUCTO (IdClasificacion),
	CONSTRAINT U_NombreSubClasi UNIQUE(NombreSubClasificacion)
);
GO
INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombreSubclasificacion,DescripcionSubclasificacion) 
VALUES (1,'Filete','Filete de pollo entero.')
		,(1,'Tira','Pollo Cortado en tiras.')
        ,(2,'Tallarin','Tallarin');
GO
CREATE TABLE  CATEGORIA_PRODUCTO(
    IdCategoria INT IDENTITY(1,1),
    NombreCategoria NVARCHAR(50),
    DescripcionCategoria NVARCHAR(150),
    Habilitado Bit default 1 not null,
    CONSTRAINT Pk_CategoriaProducto PRIMARY KEY (IdCategoria),
    CONSTRAINT U_NombreCategoria UNIQUE(NombreCategoria)
);

INSERT INTO  CATEGORIA_PRODUCTO(NombreCategoria,DescripcionCategoria) 
VALUES	('Producto Seco','Todos aquellos productos que no necesitan refrigeracion.')
		,('Carnes','Todas los tipos de carnes.'),('Salsas','Todos los tipos de salsas')
		,('Bebidas','Todos los distintos tipos de bebidas y marcas.')
		,('Verduras','Todos los distintos tipos de verduras.');
GO
CREATE TABLE ENVASE (
    IdEnvase INT IDENTITY(1,1),
    NombreEnvase NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(150),
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_Envase PRIMARY KEY (IdEnvase),
    CONSTRAINT U_NombreEnvase UNIQUE(NombreEnvase)
);
GO
INSERT INTO ENVASE(NombreEnvase,Descripcion) 
VALUES	('Botella Plastica','una botella de plastico')
		,('Bolsa Plastica','Bolsa de plastico')
		,('Caja Plastica','Una caja de plastico')
		,('Lata de aluminio','')
		,('Frasco','')
		,('Tarrro','')
		,('Botella de vidrio','Una botella de vidrio.'); 

CREATE TABLE EMPAQUE (
    IdEmpaque INT IDENTITY(1,1),
    NombreEmpaque NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200),
    Habilitado Bit default 1,
    CONSTRAINT PK_Empaque PRIMARY KEY (IdEmpaque),
    CONSTRAINT U_NombreEmpaque UNIQUE(NombreEmpaque)
);
GO
INSERT INTO EMPAQUE(NombreEmpaque,Descripcion) 
VALUES	('Caja Carton','')
		,('Caja plastica','')
		,('Bolsa Plastica','')
		,('Bolsa Papel Craft','')
		,('Cajilla Plastica','')
		,('Cajilla Carton','')
		,('Saco','');
GO
CREATE TABLE ESTADO_PRODUCTO(
	IdEstado int IDENTITY(1,1),
    Nombre NVARCHAR(50) not null,
    Descripcion NVARCHAR(50) not null,
    Habilitado Bit default 1 not null,
    constraint pk_EstadoProducto primary key(IdEstado)
);

INSERT INTO ESTADO_PRODUCTO(Nombre,Descripcion)
VALUES ('Sin Procesar','Producto que no se ha procesado')
		,('Semiterminado','Producto que se esta procesando.')
        ,('Terminado','Producto terminado.');

CREATE TABLE PRODUCTO (
    IdProducto INT IDENTITY(1,1),
	IdCategoria INT NOT NULL,
    IdSubclasificacion INT NOT NULL,
    IdEnvase INT NULL, --id del envase si es que tiene
    IdEmpaque INT NULL, --id del empaque si es que tiene
    IdEstado int not null,
    IdProveedor int not null,
    NombreProducto NVARCHAR(50) NOT NULL,
    Costo Money NOT NULL,
    Descripcion NVARCHAR(200) NOT NULL,
	CantidadEmpaque INT NULL, --si tiene empaque 
    Imagen NVARCHAR(100) NULL, --
    IdUnidadMedida INT not null,
    ValorUnidadMedida FLOAT NOT NULL,
    Habilitado Bit default 0 not null,
    CONSTRAINT PK_ID_PRODUCT PRIMARY KEY (IdProducto),
    CONSTRAINT FK_CATEGPRODU FOREIGN KEY (IdCategoria)
        REFERENCES  CATEGORIA_PRODUCTO (IdCategoria),
    CONSTRAINT FK_PRODUCT_SUBCLASIF FOREIGN KEY (IdSubclasificacion)
        REFERENCES SUBCLASIFICACION_PRODUCTO (IdSubclasificacion),
    CONSTRAINT FK_Envase_PRODUCT FOREIGN KEY (IdEnvase)
        REFERENCES ENVASE (IdEnvase),
    CONSTRAINT FK_UDM_Producto FOREIGN KEY (IdUnidadMedida)
        REFERENCES UNIDAD_MEDIDA (IdUnidadMedida),
	CONSTRAINT FK_Empaque_Producto FOREIGN KEY(IdEmpaque) 
		REFERENCES EMPAQUE(IdEmpaque),
	constraint fk_Estado_Producto foreign key(IdEstado)
		references ESTADO_PRODUCTO(IdEstado),
	constraint fk_ProveedorProducto foreign key(IdProveedor)
		references PROVEEDOR(IdProveedor),
	constraint U_ProductoUnico UNIQUE(NombreProducto,IdEnvase,IdEmpaque)
);

ALTER TABLE PRODUCTO
ADD CONSTRAINT U_Producto UNIQUE(NombreProducto,IdEnvase,IdUnidadMedida,ValorUnidadMedida);

CREATE TABLE  PRODUCTO_ORIGEN(
	IdProducto int not null,
    IdOrigen int not null,
    Habilitado Bit default 1 not null,
    constraint fk_PzroductoP foreign key(IdProducto) references PRODUCTO(IdProducto),
    constraint fk_Origen foreign key(IdOrigen) references PRODUCTO(IdProducto),
    constraint ch_Producto check(IdProducto <> IdOrigen),
    constraint U_ProductoProcedencia Unique(IdProducto,IdOrigen)
);

CREATE TABLE ESTADO_EMPAQUE(
	IdEstado INT IDENTITY(1,1),
    NombreEstado NVARCHAR(50),
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_ESTADO_PRODUC PRIMARY KEY(IdEstado),
	CONSTRAINT U_EstadoEmpaqueUnico UNIQUE(NombreEstado)
);

INSERT INTO ESTADO_EMPAQUE(NombreEstado) 
VALUES	('Cerrado/Completo')
		,('Abierto/Incompleto')
		,('Sin EMPAQUE/No viene empacado');
GO
CREATE TABLE BODEGA_SUCURSAL (
    IdBodega INT IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    DescripcionLocal NVARCHAR(200) null,
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_IDINVENT PRIMARY KEY (IdBodega)
);
GO
CREATE TABLE SUCURSAL (
    IdSucursal INT IDENTITY(1,1),
    IdBodega int null,--antes era not null
    Principal Bit not null default 0,
    NombreSucursal NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(250) NOT NULL,
    TelefonoPrincipal NVARCHAR(10),
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_IDSUCUR PRIMARY KEY (IdSucursal),
    constraint fk_BodegaSucursal foreign key(IdBodega) References BodegaSucursal(IdBodega)
)
INSERT INTO SUCURSAL(NombreSucursal,Direccion) VALUES('Restaurante Familia Chang - Rubenia','Semáforos de Rubenia 1 1/2c al La, frente al Hotel Estrella
#Managua'),('Restaurante Familia Chang - Ciudad Jardin','Ciudad jardin .....');

CREATE TABLE TRABAJADOR (
    IdTrabajador INT IDENTITY(1,1),
    IdSucursal INT NULL,
    IdCargo INT not null,
    Nombres NVARCHAR(50) NOT NULL,
    Apellidos NVARCHAR(50) NOT NULL,
    NumeroCedula NVARCHAR(50) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Direccion NVARCHAR(300) not null,
    FechaIngreso DATE NOT NULL,
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_IDTRABAJ PRIMARY KEY (IdTrabajador),
    CONSTRAINT FK_CAR_TRAB FOREIGN KEY (IdCargo)
        REFERENCES Cargo (IdCargo),
    CONSTRAINT FK_TRABSucursal FOREIGN KEY (IdSucursal)
        REFERENCES SUCURSAL (IdSucursal),
	CONSTRAINT U_NumeroCedula UNIQUE(NumeroCedula)
)
GO