CREATE DATABASE pruebas_node;
GO
USE pruebas_node;
GO
CREATE TABLE PROCEDENCIA_PRODUCTO(
	IdProcedencia int IDENTITY(1,1),
    Nombre NVARCHAR(50) not null,
    Descripcion NVARCHAR(150) null,
    Habilitado bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
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
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    constraint pk_USO_PRODUCTO primary key(IdUso),
    CONSTRAINT U_USO_PRODUCTO UNIQUE(Nombre)
);
GO
INSERT INTO USO_PRODUCTO(Nombre,Descripcion)
VALUES	('Nuevo/Sin Usar','Producto que no se ha usado.')
		,('En Uso','Producto que se esta usando.')
        ,('Usado/Agotado','Producto que se uso hasta agotarse.');
GO
CREATE TABLE MOTIVO_BAJA_PRODUCTO(
	IdMotivo INT IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Habilitado bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_MOTIVO_BAJA_PRODUCTO PRIMARY KEY(IdMotivo)
);
GO
INSERT INTO MOTIVO_BAJA_PRODUCTO(Nombre,Descripcion) 
VALUES	('Extravio','El/Los productos se extraviaron')
		,('Vencimiento','El/Los productos se vencieron.')
        ,('Robo','El/Los productos fueron robados')
        ,('Accidente','El/Los productos se hecho a perder en un accidente.')
        ,('Venta','El/Los PRODUCTOs fueron vendidos.');
GO
CREATE TABLE CARGO(
    IdCargo INT IDENTITY(1,1),
    NombreCargo NVARCHAR(50) NOT NULL,
    DescripcionCargo NVARCHAR(100),
    Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,    
    CONSTRAINT PK_IdCargo PRIMARY KEY (IdCargo)
);
GO
INSERT INTO CARGO(NombreCargo,DescripcionCargo) 
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
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    constraint pk_IdOPERADORA_TELEFONICA primary key(IdOperadora)
);
GO
INSERT INTO OPERADORA_TELEFONICA(Nombre,Abreviacion)
VALUES	('Claro','Cl')
		,('Movistar','Mv')
        ,('Cootel','Co');
GO
CREATE TABLE PROVEEDOR(
    IdProveedor INT IDENTITY(1,1),
    NombreProveedor NVARCHAR(50) NOT NULL,
    Direccion NVARCHAR(200) NOT NULL,
    Email NVARCHAR(100) NULL,
    Descripcion NVARCHAR(200) NULL,
    NombreRepresentante NVARCHAR(100) NOT NULL,
    Habilitado Bit default 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_IdProveedor PRIMARY KEY (IdProveedor)
);
GO
INSERT INTO PROVEEDOR(NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante) 
VALUES	('Cargil','de la uni 2c al sas','esteesun@correo.com','descripcion','Representante')
		,('Monisa','Managua, asdasd asdas ','esteesun@correo.com','descripcion','Representante')
		,('Insumos Chinos','asdasda sdasdsa asd','esteesun@correo.com','descripcion','Representante');
GO		
CREATE TABLE NUMERO_TELEFONO_PROVEEDOR(
    IdNumero INT IDENTITY(1,1),
    IdProveedor INT,
	IdOperadora INT,
    Prefijo NVARCHAR(3),
    NumeroTelefono NVARCHAR(20) not null,
    Habilitado Bit default 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT Fk_ProveedorTele FOREIGN KEY (IdProveedor)
        REFERENCES Proveedor (IdProveedor),
	CONSTRAINT PK_IdNumeroTelefProv PRIMARY KEY (IdNumero,IdProveedor),
	CONSTRAINT FK_OPERADORA_TELEFONO_PROVEEDOR FOREIGN KEY(IdOperadora) REFERENCES OPERADORA_TELEFONICA(IdOperadora)
);
GO
INSERT INTO NUMERO_TELEFONO_PROVEEDOR(IdProveedor,NumeroTelefono) 
VALUES	(1,'2279-9245')
		,(1,'782323239')
		,(2,'58556641')
		,(3,'322578734');
GO
CREATE TABLE CLASIFICACION_UNIDAD_MEDIDA (
    IdClasificacionUnidadMedida INT IDENTITY(1,1),
    NombreClasificacion NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(150) NULL,
    Habilitado Bit default 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_ID_CLAS_UDM PRIMARY KEY (IdClasificacionUnidadMedida)
);
GO
INSERT INTO CLASIFICACION_UNIDAD_MEDIDA(NombreClasificacion,Descripcion) 
VALUES	('Masa','Miden el peso del producto.')
		,('Volumen','Miden el espacio que ocupa el producto.');
GO
CREATE TABLE UNIDAD_MEDIDA (
    IdUnidadMedida INT IDENTITY(1,1),
    IdClasificacionUnidadMedida INT,
    NombreUnidad NVARCHAR(50) NOT NULL,
    Simbolo NVARCHAR(3) NULL,
    Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_ID_UDM PRIMARY KEY (IdUnidadMedida),
    CONSTRAINT FK_CLAS_UDM FOREIGN KEY (IdClasificacionUnidadMedida)
        REFERENCES CLASIFICACION_UNIDAD_MEDIDA (IdClasificacionUnidadMedida)
);
GO
INSERT INTO UNIDAD_MEDIDA(IdClasificacionUnidadMedida,NombreUnidad,Simbolo) 
VALUES	(1,'Libra','Lb')
		,(1,'Kilogramo','Kg')
		,(2,'Litro','Lt')
		,(2,'Mililitro','Ml')
		,(1,'Miligramo','Mg');
GO
CREATE TABLE CLASIFICACION_PRODUCTO (
    IdClasificacion INT IDENTITY(1,1),
    NombreClasificacion NVARCHAR(50) NOT NULL,
    DescripcionClasificacion NVARCHAR(100),
    Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_CLASIFPRODUCT PRIMARY KEY (IdClasificacion),
    CONSTRAINT U_NOMBRECLASIF UNIQUE(NombreClasificacion)
);
GO
INSERT INTO CLASIFICACION_PRODUCTO(NombreClasificacion,DescripcionClasificacion) 
VALUES	('Pollo','Las distintas cortes de pollo.')
		,('Pastas','Distintos tipos de pasta')
		,('Granos Basicos',NULL)
GO
CREATE TABLE SUBCLASIFICACION_PRODUCTO (
    IdSubclasificacion INT IDENTITY(1,1),
    IdClasificacion INT,
    NombreSubclasificacion NVARCHAR(50),
    DescripcionSubclasificacion NVARCHAR(150),
    Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
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
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
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
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
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
GO
CREATE TABLE EMPAQUE (
    IdEmpaque INT IDENTITY(1,1),
    NombreEmpaque NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200),
    Habilitado Bit default 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
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
GO
INSERT INTO ESTADO_PRODUCTO(Nombre,Descripcion)
VALUES ('Sin Procesar','Producto que no se ha procesado')
		,('Semiterminado','Producto que se esta procesando.')
        ,('Terminado','Producto terminado.');
GO
CREATE TABLE PRODUCTO (
    IdProducto INT IDENTITY(1,1),
	IdCategoria INT NOT NULL,
    IdSubclasificacion INT NOT NULL,
    IdEstado int not null,
    NombreProducto NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200) NOT NULL,
    Imagen NVARCHAR(100) NOT NULL DEFAULT 'nodisponible.png', --	
	DiasCaducidad  INT NOT NULL DEFAULT 30,
	Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_ID_PRODUCT PRIMARY KEY (IdProducto),
    CONSTRAINT FK_CATEGPRODU FOREIGN KEY (IdCategoria)
        REFERENCES  CATEGORIA_PRODUCTO (IdCategoria),
    CONSTRAINT FK_PRODUCT_SUBCLASIF FOREIGN KEY (IdSubclasificacion)
        REFERENCES SUBCLASIFICACION_PRODUCTO (IdSubclasificacion),
	constraint fk_Estado_Producto foreign key(IdEstado)
		references ESTADO_PRODUCTO(IdEstado),
	constraint U_ProductoUnico UNIQUE(NombreProducto)
);
GO
CREATE TABLE PRODUCTO_PROVEEDOR(
	IdProductoProveedor INT IDENTITY(1,1),
	IdProducto INT NOT NULL,
	IdProveedor INT NOT NULL,
	IdEnvase INT NULL, --id del envase si es que tiene
    IdEmpaque INT NULL, --id del empaque si es que tiene
	IdUnidadMedida INT not null,
    ValorUnidadMedida FLOAT NOT NULL,
	CantidadEmpaque INT NULL, --si tiene empaque 
	Costo Money NOT NULL,
	Habilitado Bit default 0 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
	CONSTRAINT PK_PRODUCTO_PROVEEDOR PRIMARY KEY(IdProductoProveedor),
	CONSTRAINT fk_PRODUCTO_PROVEIDO FOREIGN KEY(IdProducto) references PRODUCTO(IdProducto),
	constraint fk_ProveedorProducto foreign key(IdProveedor) references PROVEEDOR(IdProveedor),
	CONSTRAINT FK_Envase_PRODUCT FOREIGN KEY (IdEnvase) REFERENCES ENVASE (IdEnvase),
    CONSTRAINT FK_UDM_Producto FOREIGN KEY (IdUnidadMedida) REFERENCES UNIDAD_MEDIDA (IdUnidadMedida),
	CONSTRAINT FK_Empaque_Producto FOREIGN KEY(IdEmpaque)  REFERENCES EMPAQUE(IdEmpaque),
	CONSTRAINT U_PRODUCTO_PROVEEDOR UNIQUE(IdProducto,IdProveedor)
)
GO
CREATE TABLE  PRODUCTO_ORIGEN(
	IdProducto int not null,
    IdOrigen int not null,
    Habilitado Bit default 1 not null,
    constraint fk_PzroductoP foreign key(IdProducto) references PRODUCTO(IdProducto),
    constraint fk_Origen foreign key(IdOrigen) references PRODUCTO(IdProducto),
    constraint ch_Producto check(IdProducto <> IdOrigen),
    constraint U_ProductoProcedencia Unique(IdProducto,IdOrigen)
);
GO
CREATE TABLE ESTADO_EMPAQUE(
	IdEstadoEmpaque INT IDENTITY(1,1),
    NombreEstado NVARCHAR(50),
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_ESTADO_PRODUC PRIMARY KEY(IdEstadoEmpaque),
	CONSTRAINT U_EstadoEmpaqueUnico UNIQUE(NombreEstado)
);
GO
INSERT INTO ESTADO_EMPAQUE(NombreEstado) 
VALUES	('Cerrado/Completo')
		,('Abierto/Incompleto')
		,('Sin EMPAQUE/No viene empacado');
GO
CREATE TABLE BODEGA_SUCURSAL (
    IdBodegaS INT IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    DescripcionLocal NVARCHAR(200) null,
    Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_IDINVENT PRIMARY KEY (IdBodegaS)
);
GO
CREATE TABLE SUCURSAL (
    IdSucursal INT IDENTITY(1,1),
    IdBodegaS int null,--antes era not null
    Principal Bit not null default 0,
    NombreSucursal NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(250) NOT NULL,
    Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_IDSUCUR PRIMARY KEY (IdSucursal),
    constraint fk_BodegaSucursal foreign key(IdBodegaS) References BODEGA_SUCURSAL(IdBodegaS)
)
INSERT INTO SUCURSAL(NombreSucursal,Direccion) VALUES('Restaurante Familia Chang - Rubenia','Semáforos de Rubenia 1 1/2c al La, frente al Hotel Estrella
#Managua'),('Restaurante Familia Chang - Ciudad Jardin','Ciudad jardin .....');
GO
CREATE TABLE TELEFONO_SUCURSAL(
	IdTelefonoSucursal INT IDENTITY(1,1), 
	IdSucursal INT NOT NULL,
	IdOperadora INT NOT NULL,
	NumeroTelefono NVARCHAR(20) NOT NULL,
	Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
	CONSTRAINT PK_TELEFONO_SUCURSAL PRIMARY KEY(IdTelefonoSucursal),
	CONSTRAINT FK_TELEFONO_SUCURSAL FOREIGN KEY(IdSucursal) REFERENCES SUCURSAL(IdSucursal),
	CONSTRAINT FK_TELEFONO_OPERADORA FOREIGN KEY(IdOperadora) REFERENCES OPERADORA_TELEFONICA(IdOperadora)
)
GO
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
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
    CONSTRAINT PK_IDTRABAJ PRIMARY KEY (IdTrabajador),
    CONSTRAINT FK_TRABAJADOR_CARGO FOREIGN KEY (IdCargo)
        REFERENCES Cargo (IdCargo),
    CONSTRAINT FK_TRABAJADOR_SUCURSAL FOREIGN KEY (IdSucursal)
        REFERENCES SUCURSAL (IdSucursal),
	CONSTRAINT U_NumeroCedula UNIQUE(NumeroCedula)
)
GO
CREATE TABLE TELEFONO_TRABAJADOR(
	IdTelefonoTrabajador INT IDENTITY(1,1), 
	IdTrabajador INT NOT NULL,
	IdOperadora INT NOT NULL,
	NumeroTelefono NVARCHAR(20) NOT NULL,
	Habilitado Bit default 1 not null,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdateAt DATETIME NULL,
	CONSTRAINT PK_TELEFONO_TRABAJADOR PRIMARY KEY(IdTelefonoTrabajador),
	CONSTRAINT FK_TELEFONO_TRABAJADOR FOREIGN KEY(IdTrabajador) REFERENCES TRABAJADOR(IdTrabajador),
	CONSTRAINT FK_TELEFONO_OPERADORA FOREIGN KEY(IdOperadora) REFERENCES OPERADORA_TELEFONICA(IdOperadora)
)
GO
create TABLE AREA_PRODUCCION(
	IdAreaProduccion int IDENTITY(1,1),
	IdSucursal INT NOT NULL,
    Nombre NVARCHAR(50) NOT NULL,
    Habilitado Bit default 1 not null,
	CreateAt DATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt DATETIME NULL,
    constraint pk_IdAreaProduccion primary key(IdAreaProduccion), 
	CONSTRAINT FK_SUCURSAL_AREA_PRODUCCION FOREIGN KEY(IdSucursal) REFERENCES SUCURSAL(IdSucursal),
	CONSTRAINT U_SUCURSAL_AREA_PRODUCCION UNIQUE(IdSucursal)
)
GO
--NOMBRE ANTERIOR BODEGA_AREA_PRODUCCION
create table BODEGA_AREA_PRODUCCION(
	IdBodegaAreaP int IDENTITY(1,1),
	IdAreaProduccion INT NOT NULL,
    Nombre NVARCHAR(50) not null,
    Descripcion NVARCHAR(300) null,
    Habilitado Bit default 1 not null,
	CreateAt DATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt DATETIME NULL,
    constraint pk_IdBodegaAP primary key(IdBodegaAreaP),
	constraint FK_BODEGA_AREA_PRODUCCION foreign key(IdAreaProduccion) references AREA_PRODUCCION(IdAreaProduccion),
	constraint u_BODEA_PARA_AP UNIQUE(IdAreaProduccion)
)
GO
CREATE TABLE ESTADO_EDICION(
	IdEstadoEdicion INT IDENTITY(1,1),
	NombreEstado NVARCHAR(50) NOT NULL,
	CONSTRAINT PK_ESTADO_EDICION PRIMARY KEY(IdEstadoEdicion)
)
GO
INSERT INTO ESTADO_EDICION
VALUES('Abierta'),('Cerrada')
GO
CREATE TABLE ENTRADA_BODEGA_AREA_PRODUCCION (
    IdEntradaBodegaAP INT IDENTITY,
    IdBodegaAreaP INT not null,
    IdTrabajador INT NOT NULL,
	IdProveedor INT NOT NULL,
	IdEstadoEdicion INT NOT NULL DEFAULT 1,
	NFactura NVARCHAR(20) NOT NULL,
	RepresentanteProveedor NVARCHAR(50) NOT NULL,
	SubTotalFactura MONEY NULL CHECK(SubTotalFactura > 0),
	PorcRetencion NUMERIC(3,2) NULL,
	Retencion MONEY NULL,
	PorcIva NUMERIC(3,2) NULL,
	IvaTotal MONEY NULL,
	PorcDescuento NUMERIC(3,2) NULL,
	DescuentoTotal MONEY NULL CHECK(DescuentoTotal >= 0),
	TotalFactura MONEY NULL,
	FechaHora DATETIME NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint pk_IdEntradaBodega primary key(IdEntradaBodegaAP),
    constraint fk_BodegaEntradaB foreign key(IdBodegaAreaP) references BODEGA_AREA_PRODUCCION(IdBodegaAreaP),
	constraint fk_ENTRADA_BAP_EDICION FOREIGN KEY(IdEstadoEdicion) references ESTADO_EDICION(IdEstadoEdicion),
	constraint fk_ProveedorEntradaProducto foreign key(IdProveedor) REFERENCES PROVEEDOR(IdProveedor),
    constraint fk_TrabIngreEntradaB foreign key(IdTrabajador) references TRABAJADOR(IdTrabajador)
);
GO
CREATE TABLE DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION (
    IdDetalleEntradaAP INT IDENTITY(1,1),
    IdEntradaBodegaAP INT NOT NULL,
    IdProductoProveedor INT NOT NULL,
    Cantidad INT NOT NULL,
	PrecioUnitarioEntrada MONEY NOT NULL CHECK(PrecioUnitarioEntrada >=0),
	PrecioUnitarioActual MONEY NOT NULL,
	DescuentoCalculado MONEY NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint Pk_DetalleEntradaInv PRIMARY KEY (IdDetalleEntradaAP , IdEntradaBodegaAP),
    CONSTRAINT FK_DetalleEntrada FOREIGN KEY (IdEntradaBodegaAP) REFERENCES ENTRADA_BODEGA_AREA_PRODUCCION(IdEntradaBodegaAP),
    CONSTRAINT FK_Producto_EntradaInvent FOREIGN KEY (IdProductoProveedor) REFERENCES PRODUCTO_PROVEEDOR(IdProductoProveedor)
);
GO
--NOMBRE ANTERIOR 
create table DETALLE_BODEGA_AP(
	IdDetalle int IDENTITY(1,1),
	IdBodegaAreaP int not null,
	IdDetalleEntradaAP INT NOT NULL,-- PAra saber que producto de que detalle
	IdEntradaBodegaAP INT NOT NULL,--
    IdProductoProveedor int not null,
	IdEstadoEmpaque INT NOT NULL,
    Cantidad int not null check(Cantidad >= 0),
    FechaHoraIngreso datetime not null,
    FechaHoraProduccion datetime null,
    Habilitado Bit default 1 not null,
    constraint pk_IdDetalleBodega primary key(IdDetalle,IdBodegaAreaP),	
    constraint fk_BodegaDelleAP foreign key(IdBodegaAreaP) references BODEGA_AREA_PRODUCCION(IdBodegaAreaP),
	constraint fk_DetalleEntradaBodegaAP foreign key(IdDetalleEntradaAP,IdEntradaBodegaAP) references DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION(IdDetalleEntradaAP,IdEntradaBodegaAP),
    constraint fk_IdProducto foreign key(IdProductoProveedor) references PRODUCTO_PROVEEDOR(IdProductoProveedor),
	constraint fk_EstadoEmpaqueProductoBodega FOREIGN KEY(IdEstadoEmpaque) REFERENCES ESTADO_EMPAQUE(IdEstadoEmpaque)
)

