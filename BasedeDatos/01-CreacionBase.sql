CREATE DATABASE pruebas_node;
GO
USE pruebas_node;
GO
CREATE TABLE PROCEDENCIA_PRODUCTO(
	IdProcedencia	INT IDENTITY(1,1),
    Nombre			NVARCHAR(50)		NOT NULL,
    Descripcion		NVARCHAR(150)		NULL,
    Habilitado		BIT DEFAULT 1		NOT NULL,
    CreatedAt		SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt		SMALLDATETIME		NULL,
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
	IdUso		INT IDENTITY(1,1),
    Nombre		NVARCHAR(50)		NOT NULL,
    Descripcion NVARCHAR(150)		NULL,
    Habilitado	BIT DEFAULT 1		NOT NULL,
    CreatedAt	SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt	SMALLDATETIME		NULL,
    constraint pk_USO_PRODUCTO primary key(IdUso),
    CONSTRAINT U_USO_PRODUCTO UNIQUE(Nombre)
);
GO
CREATE TABLE TIPO_DOCUMENTO_IDENTIFICACION(
	IdTipoDocumento		INT IDENTITY(1,1),
	NombreTD			NVARCHAR(50)		NOT NULL	UNIQUE,
	DescripcionTD		NVARCHAR(150)		NULL,
	Habilitado			BIT					NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	UpdatedAt			SMALLDATETIME		NULL,
	CONSTRAINT PK_TIPO_DOCUMENTO_IDENTIFICACION PRIMARY KEY(IdTipoDocumento)
)
GO
SET IDENTITY_INSERT dbo.TIPO_DOCUMENTO_IDENTIFICACION ON;
GO
INSERT INTO TIPO_DOCUMENTO_IDENTIFICACION(IdTipoDocumento,NombreTD, DescripcionTD)
VALUES(1,'Cedula',NULL),(2,'Numero RUC', NULL)
GO
SET IDENTITY_INSERT dbo.TIPO_DOCUMENTO_IDENTIFICACION OFF;
GO
INSERT INTO USO_PRODUCTO(Nombre,Descripcion)
VALUES	('Nuevo/Sin Usar','Producto que no se ha usado.')
		,('En Uso','Producto que se esta usando.')
        ,('Usado/Agotado','Producto que se uso hasta agotarse.');
GO
CREATE TABLE MOTIVO_BAJA_PRODUCTO(
	IdMotivo		INT IDENTITY(1,1),
    Nombre			NVARCHAR(50)		NOT NULL,
    Descripcion		NVARCHAR(200)		NULL,
    Habilitado		BIT DEFAULT 1		NOT NULL,
    CreatedAt		SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt		SMALLDATETIME		NULL,
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
    IdCargo				INT IDENTITY(1,1),
    NombreCargo			NVARCHAR(50)		NOT NULL,
    DescripcionCargo	NVARCHAR(100)		NULL,
    Habilitado			Bit DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,    
    CONSTRAINT PK_IdCargo PRIMARY KEY (IdCargo)
);
GO
INSERT INTO CARGO(NombreCargo,DescripcionCargo) 
VALUES ('Propietario','Propietario del restaurante')
		,('Gerente','')
        ,('Chofer','')
        ,('Bodeguero','Encargado del manejo de los inventarios.')
        ,('Encargado de Sucursal','Encargado del funcionamiento de la Sucursal.');
GO	
CREATE TABLE PAIS(
	IdPais				INT	IDENTITY(1,1),
	NombrePais			NVARCHAR(50)		NOT NULL	UNIQUE,
	Abreviatura			NVARCHAR(3)			NOT NULL	UNIQUE,
	PrefijoTelefonico	NVARCHAR(4)			NOT NULL	UNIQUE,
	CONSTRAINT	Pk_Pais	PRIMARY KEY(IdPais)
)
GO
INSERT INTO PAIS(NombrePais, Abreviatura, PrefijoTelefonico)
VALUES('Nicaragua', 'NIC','505'), ('China','CH','012')
GO
CREATE TABLE dbo.PROVEEDOR(
    IdProveedor			INT IDENTITY(1,1),
	IdPais				INT					NOT NULL	DEFAULT 1, --Foraneo
    NombreProveedor		NVARCHAR(50)		NOT NULL,
    Direccion			NVARCHAR(200)		NOT NULL,
    Email				NVARCHAR(100)		NULL,
	Imagen				NVARCHAR(50)		NOT NULL	DEFAULT 'proveedor.png',
    Descripcion			NVARCHAR(200)		NULL,
    NombreRepresentante NVARCHAR(100)		NOT NULL,
	IdTipoDocumento		INT					NOT NULL,  -- Foraneo
	Documento			NVARCHAR(50)		NULL,
    Retencion2			Bit					NOT NULL	DEFAULT 0,
	Mercado				BIT					NOT NULL	DEFAULT 0,
	Habilitado			Bit					NOT NULL	DEFAULT 1,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_IdProveedor PRIMARY KEY (IdProveedor),
	CONSTRAINT FK_PAIS_PROVEEDOR FOREIGN KEY(IdPais) REFERENCES PAIS(IdPais),
	CONSTRAINT FK_TIPO_DOCUMENTO_PROVEEDOR FOREIGN KEY(IdTipoDocumento) REFERENCES TIPO_DOCUMENTO_IDENTIFICACION(IdTipoDocumento)
);
GO

IF OBJECT_ID('dbo.TELEFONOS_PROVEEDOR') IS NOT NULL 
	DROP TABLE dbo.TELEFONOS_PROVEEDOR

GO
CREATE TABLE dbo.TELEFONOS_PROVEEDOR (
	IdTelefono INT IDENTITY(1,1)
	, IdProveedor INT NOT NULL
	, Telefono NVARCHAR(15) NOT NULL
	, Nombre NVARCHAR(20) NOT NULL
	, Cargo NVARCHAR(15) NULL
	, Habilitado	BIT NOT NULL DEFAULT 1
	, CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE()
    , UpdateAt			SMALLDATETIME		NULL

	CONSTRAINT PK_IdTelefono PRIMARY KEY(IdTelefono),
	CONSTRAINT FK_IdTelefonoProveedor FOREIGN KEY(IdProveedor) REFERENCES PROVEEDOR(IdProveedor)
)
GO

--Por default es 2 por que hasta el momento es 2 el id del tipo numero RUC
ALTER TABLE PROVEEDOR
	ADD CONSTRAINT DF_IdTipoNumeroRUC_Proveedor DEFAULT 2 FOR IdTipoDocumento
GO
--ALTER TABLE PROVEEDOR

 --ADD CONSTRAINT U_NumeroRuc UNIQUE(Documento)
CREATE UNIQUE NONCLUSTERED INDEX idx_NumeroRuc
ON dbo.PROVEEDOR(Documento)
WHERE Documento IS NOT NULL;
--INSERT INTO PROVEEDOR(NombreProveedor,Direccion,Email,Descripcion,NombreRepresentante,Telefono) 
--VALUES	('Cargil','de la uni 2c al sas','esteesun@correo.com','descripcion','Representante','87792956')
--		,('Monisa','Managua, asdasd asdas ','esteesun@correo.com','descripcion','Representante','87603420')
--		,('Insumos Chinos','asdasda sdasdsa asd','esteesun@correo.com','descripcion','Representante','87792987');
GO
CREATE TABLE CLASIFICACION_UNIDAD_MEDIDA (
    IdClasificacionUnidadMedida	INT IDENTITY(1,1),
    NombreClasificacion			NVARCHAR(50)		NOT NULL,
    Descripcion					NVARCHAR(150)		NULL,
    Habilitado					Bit								DEFAULT 1,
    CreatedAt					SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt					SMALLDATETIME		NULL,
    CONSTRAINT PK_ID_CLAS_UDM PRIMARY KEY (IdClasificacionUnidadMedida)
);
GO
INSERT INTO CLASIFICACION_UNIDAD_MEDIDA(NombreClasificacion,Descripcion) 
VALUES	('Masa','Miden el peso del producto.')
		,('Volumen','Miden el espacio que ocupa el producto.');
GO
CREATE TABLE UNIDAD_MEDIDA (
    IdUnidadMedida				INT IDENTITY(1,1),
    IdClasificacionUnidadMedida INT,
    NombreUnidad				NVARCHAR(50)		NOT NULL,
    Simbolo						NVARCHAR(3)			NULL,
	NImportancia				INT					NOT NULL,
    Habilitado					Bit DEFAULT 1		NOT NULL,
    CreatedAt					SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt					SMALLDATETIME		NULL,
    CONSTRAINT PK_ID_UDM	PRIMARY KEY (IdUnidadMedida),
    CONSTRAINT FK_CLAS_UDM	FOREIGN KEY (IdClasificacionUnidadMedida)
        REFERENCES dbo.CLASIFICACION_UNIDAD_MEDIDA (IdClasificacionUnidadMedida)
);
GO
INSERT INTO UNIDAD_MEDIDA(IdClasificacionUnidadMedida,NombreUnidad,Simbolo, NImportancia) 
VALUES	(1,'Libra','Lb', 1)
		,(1,'Kilogramo','Kg',1)
		,(2,'Litro','Lt', 2)
		,(2,'Mililitro','Ml', 2)
		,(1,'Miligramo','Mg', 3)
		,(2,'Onza','Oz', 4);
GO
CREATE TABLE CLASIFICACION_UNIDAD_MEDIDA_FUNCIONAL(
	IdClasificacionUdmF		INT IDENTITY(1,1),
	NombreClasfUdmF			NVARCHAR(50)		NOT NULL	UNIQUE,
	DescripcionClasfUdmF	NVARCHAR(150)		NOT NULL,
	Habilitado				BIT					NOT NULL	DEFAULT 1,
	CreatedAt				SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	CONSTRAINT PK_CLASIFICACION_UDM_FUNCIONAL PRIMARY KEY(IdClasificacionUdmF)
)
GO
CREATE TABLE UNIDAD_MEDIDA_FUNCIONAL(
	IdUdmFuncional			INT	IDENTITY(1,1),
	IdClasificacionUdmF		INT				NOT NULL,
	IdUnidadMedida			INT				NOT NULL,
	Nombre					NVARCHAR(50)	NOT NULL,
	Descripcion				NVARCHAR(50)	NULL,
	ValorUdm				NUMERIC(10,5)	NOT NULL	CHECK( ValorUdm > 0),
	CreatedAt				DATE			NOT NULL	DEFAULT GETDATE(),
	UpdateAt				DATE			NULL,
	CONSTRAINT Pk_UnidadMedidaFuncional		PRIMARY KEY(IdUdmFuncional),
	CONSTRAINT FK_UnidadDeMedidaFuncional	FOREIGN KEY(IdUnidadMedida) REFERENCES dbo.UNIDAD_MEDIDA(IdUnidadMedida),
	CONSTRAINT FK_ClasificacionUdmFuncional FOREIGN KEY(IdClasificacionUdmF) REFERENCES dbo.CLASIFICACION_UNIDAD_MEDIDA_FUNCIONAL(IdClasificacionUdmF)
)
GO
IF OBJECT_ID('USP_CREATE_UNIDAD_MEDIDA', N'P') IS NOT NULL
	DROP PROCEDURE USP_CREATE_UNIDAD_MEDIDA
GO
CREATE PROCEDURE USP_CREATE_UNIDAD_MEDIDA(
	@IdUdmFuncional		INT				OUTPUT,
	@IdUnidadMedida		INT,
	@Nombre				NVARCHAR(50),
	@Descripcion		NVARCHAR(50)	NULL,
	@ValorUdm			NUMERIC(10,5)
) AS BEGIN
	INSERT INTO dbo.UNIDAD_MEDIDA_FUNCIONAL(IdUnidadMedida, Nombre, Descripcion, ValorUdm)
	VALUES(@IdUnidadMedida, @Nombre, @Descripcion, @ValorUdm)
	
	SELECT @IdUdmFuncional = @@IDENTITY
END
GO
CREATE TABLE  CATEGORIA_PRODUCTO(
    IdCategoria				INT IDENTITY(1,1),
    NombreCategoria			NVARCHAR(50)		NOT NULL,
    DescripcionCategoria	NVARCHAR(150),
    Habilitado				Bit DEFAULT 1		NOT NULL,
    CreatedAt				SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt				SMALLDATETIME		NULL,
    CONSTRAINT Pk_CategoriaProducto PRIMARY KEY (IdCategoria),
    CONSTRAINT U_NombreCategoria UNIQUE(NombreCategoria)
);

INSERT INTO  CATEGORIA_PRODUCTO(NombreCategoria,DescripcionCategoria) 
VALUES	('Producto Seco','Todos aquellos productos que no necesitan refrigeracion.')
		,('Carnes','Todas los tipos de carnes.'),('Salsas','Todos los tipos de salsas')
		,('Bebidas','Todos los distintos tipos de bebidas y marcas.')
		,('Verduras','Todos los distintos tipos de verduras.');
GO
CREATE TABLE CLASIFICACION_PRODUCTO (
    IdClasificacion				INT IDENTITY(1,1),
	IdCategoria					INT					NOT NULL,
    NombreClasificacion			NVARCHAR(50)		NOT NULL,
    DescripcionClasificacion	NVARCHAR(100),
    Habilitado					Bit					NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt					SMALLDATETIME		NULL,
    CONSTRAINT PK_CLASIFPRODUCT PRIMARY KEY (IdClasificacion),
    CONSTRAINT U_NOMBRECLASIF	UNIQUE(NombreClasificacion),
	CONSTRAINT FK_CATEGORIA_DE_CLASIFICACION FOREIGN KEY(IdCategoria) REFERENCES CATEGORIA_PRODUCTO(IdCategoria)
);
GO
INSERT INTO CLASIFICACION_PRODUCTO(IdCategoria, NombreClasificacion, DescripcionClasificacion) 
VALUES	(2, 'Pollo','Las distintas cortes de pollo.')
		,(1,'Pastas','Distintos tipos de pasta')
		,(1, 'Granos Basicos',NULL)
		,(4, 'Bebidas Artificiales',NULL)
GO
CREATE TABLE SUBCLASIFICACION_PRODUCTO (
    IdSubClasificacion			INT IDENTITY(1,1),
    IdClasificacion				INT,
    NombreSubClasificacion		NVARCHAR(50)	NOT NULL,
    DescripcionSubclasificacion NVARCHAR(150),
    Habilitado					Bit				NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
    UpdateAt					SMALLDATETIME	NULL,
    CONSTRAINT Pk_IdSubClasfProdu PRIMARY KEY (IdSubClasificacion),
    CONSTRAINT FK_SUBCLAS_CLAS FOREIGN KEY (IdClasificacion)
        REFERENCES CLASIFICACION_PRODUCTO (IdClasificacion),
	CONSTRAINT U_NombreSubClasi UNIQUE(NombreSubClasificacion)
);
GO
INSERT INTO SUBCLASIFICACION_PRODUCTO(IdClasificacion,NombreSubClasificacion,DescripcionSubclasificacion) 
VALUES (1,'Filete','Filete de pollo entero.')
		,(1,'Tira','Pollo Cortado en tiras.')
        ,(2,'Tallarin','Tallarin')
		,(4, 'Gaseosas',NULL)
GO
CREATE TABLE ENVASE (
    IdEnvase			INT IDENTITY(1,1),
    NombreEnvase		NVARCHAR(50)		NOT NULL,
    Descripcion			NVARCHAR(150),
    Habilitado			Bit					NOT NULL	DEFAULT 1,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,
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
    IdEmpaque		INT IDENTITY(1,1),
    NombreEmpaque	NVARCHAR(50)			NOT NULL,
    Descripcion		NVARCHAR(200),
    Habilitado		Bit									DEFAULT 1,
    CreatedAt		SMALLDATETIME			NOT NULL	DEFAULT GETDATE(),
    UpdateAt		SMALLDATETIME			NULL,
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
	IdEstado	INT IDENTITY(1,1),
    Nombre		NVARCHAR(50)		NOT NULL,
    Descripcion NVARCHAR(50)		NULL,
    Habilitado	Bit 				NOT NULL	DEFAULT 1,
    constraint pk_EstadoProducto primary key(IdEstado)
);
GO
INSERT INTO ESTADO_PRODUCTO(Nombre,Descripcion)
VALUES ('Sin Procesar','Producto que no se ha procesado')
		,('Semiterminado','Producto que se esta procesando.')
        ,('Terminado','Producto terminado.');
GO

--IF OBJECT_ID('dbo.TIPO_INSUMO') IS NOT NULL
--	DROP TABLE dbo.TIPO_INSUMO

CREATE TABLE dbo.TIPO_INSUMO (
	IdTipoInsumo INT IDENTITY(1,1),
	Descripcion VARCHAR(200),
	Habilitado	BIT DEFAULT 1,
	CreatedAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,

	CONSTRAINT PK_ID_TIPO_INSUMO PRIMARY KEY (IdTipoInsumo)
)
GO

INSERT INTO dbo.TIPO_INSUMO(Descripcion) VALUES ('Consumo')
INSERT INTO dbo.TIPO_INSUMO(Descripcion) VALUES('Limpieza')

GO

CREATE TABLE dbo.PRODUCTO (
    IdProducto			INT IDENTITY(1,1),
	IdProveedor			INT NOT NULL,
    IdSubClasificacion	INT					NOT NULL,
    IdEstado			int					NOT NULL,
	IdEnvase			INT					NULL, --id del envase si es que tiene
    IdEmpaque			INT					NULL, --id del empaque si es que tiene
	IdUnidadMedida		INT					NOT NULL,
    ValorUnidadMedida	NUMERIC(10,5)		NOT NULL,
	CantidadEmpaque		INT					NULL, --si tiene empaque 
	DiasRotacion		INT					NOT NULL,
    NombreProducto		NVARCHAR(50)		NOT NULL,
    Descripcion			NVARCHAR(200)		NOT NULL,
	CodigoProducto		NVARCHAR(100)		NOT NULL,
	CodigoInterno		NVARCHAR(100)		NULL,
	CodigoBarra			NVARCHAR(100)		NULL,
	TipoInsumo			INT					NOT NULL, 
    Imagen				NVARCHAR(100)		NOT NULL	DEFAULT 'nodisponible.png', --	
	Habilitado			Bit DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_ID_PRODUCT PRIMARY KEY (IdProducto),
    CONSTRAINT FK_PRODUCT_SUBCLASIF FOREIGN KEY (IdSubClasificacion)
        REFERENCES dbo.SUBCLASIFICACION_PRODUCTO (IdSubClasificacion),
	constraint fk_Estado_Producto foreign key(IdEstado)
		references dbo.ESTADO_PRODUCTO(IdEstado),
	--constraint U_ProductoUnico 
	--	UNIQUE(NombreProducto),
	CONSTRAINT FK_Envase_PRODUCT FOREIGN KEY (IdEnvase) 
		REFERENCES dbo.ENVASE (IdEnvase),
    CONSTRAINT FK_UDM_Producto FOREIGN KEY (IdUnidadMedida) 
		REFERENCES dbo.UNIDAD_MEDIDA (IdUnidadMedida),
	CONSTRAINT FK_Empaque_Producto FOREIGN KEY(IdEmpaque)  
		REFERENCES dbo.EMPAQUE(IdEmpaque),
		CONSTRAINT FL_Proveedor FOREIGN KEY(IdProveedor)  
		REFERENCES dbo.PROVEEDOR(IdProveedor),
	CONSTRAINT FL_TipoInsumoProducto FOREIGN KEY(TipoInsumo)  
		REFERENCES dbo.TIPO_INSUMO(IdTipoInsumo),
	CONSTRAINT UC_CodigoProducto UNIQUE (CodigoProducto),	
);

CREATE UNIQUE NONCLUSTERED INDEX idx_CodigoBarra
ON dbo.Producto(CodigoBarra)
WHERE CodigoBarra IS NOT NULL;

CREATE UNIQUE NONCLUSTERED INDEX idx_CodigoInterno
ON dbo.Producto(CodigoInterno)
WHERE CodigoInterno IS NOT NULL;

GO
CREATE TABLE PRODUCTO_PROVEEDOR (
	IdProductoProveedor		INT IDENTITY(1,1) PRIMARY KEY,
	IdProducto				INT NOT NULL,
	IdProveedor				INT NOT NULL,
	Habilitado				Bit DEFAULT 1		NOT NULL,
    CreatedAt				SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
    UpdateAt				SMALLDATETIME		NULL,
	CONSTRAINT FK_Producto_Proveedor FOREIGN KEY (IdProducto)
		REFERENCES Producto(IdProducto),
	CONSTRAINT FK_Proveedor_Producto FOREIGN KEY (IdProveedor)
		REFERENCES Proveedor(IdProveedor)
)
GO
CREATE TABLE  PRODUCTO_ORIGEN(
	IdProducto		int				NOT NULL,
    IdOrigen		int				NOT NULL,
    Habilitado		Bit				NOT NULL	DEFAULT 1,
	CreatedAt		SMALLDATETIME	NOT NULL	DEFAULT GETDATE(),
    constraint fk_PzroductoP foreign key(IdProducto) references PRODUCTO(IdProducto),
    constraint fk_Origen foreign key(IdOrigen) references PRODUCTO(IdProducto),
    constraint ch_Producto check(IdProducto <> IdOrigen),
    constraint U_ProductoProcedencia Unique(IdProducto,IdOrigen)
);
GO
CREATE TABLE ESTADO_EMPAQUE(
	IdEstadoEmpaque		INT IDENTITY(1,1),
    NombreEstado		NVARCHAR(50),
    Habilitado			Bit					NOT NULL	DEFAULT 1,
	CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    CONSTRAINT PK_ESTADO_PRODUC PRIMARY KEY(IdEstadoEmpaque),
	CONSTRAINT U_EstadoEmpaqueUnico UNIQUE(NombreEstado)
);
GO
INSERT INTO ESTADO_EMPAQUE(NombreEstado) 
VALUES	('Cerrado/Completo')
		,('Abierto/Incompleto')
		,('Sin EMPAQUE/No viene empacado');
GO
CREATE TABLE SUCURSAL (
    IdSucursal		INT IDENTITY(1,1),
    Principal		BIT					NOT NULL	DEFAULT 0,
    NombreSucursal	NVARCHAR(100)		NOT NULL,
    Direccion		NVARCHAR(250)		NOT NULL,
	Telefono1		NVARCHAR(20)		NOT NULL,
	Telefono2		NVARCHAR(20)		NULL,
    Habilitado		Bit					NOT NULL	DEFAULT 1,
    CreatedAt		SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt		SMALLDATETIME		NULL,
    CONSTRAINT PK_IDSUCUR PRIMARY KEY (IdSucursal)
)
GO
ALTER TABLE SUCURSAL
	ADD CONSTRAINT U_NombreSucursal UNIQUE(NombreSucursal)
GO
INSERT INTO SUCURSAL(NombreSucursal,Direccion,Telefono1) VALUES('Restaurante Familia Chang - Rubenia','Semforos de Rubenia 1 1/2c al La, frente al Hotel Estrella
#Managua','22492774'),('Restaurante Familia Chang - Ciudad Jardin','Ciudad jardin','22492742');
GO
CREATE TABLE TELEFONO_SUCURSAL(
	IdTelefonoSucursal	INT IDENTITY(1,1), 
	IdSucursal			INT					NOT NULL,
	NumeroTelefono		NVARCHAR(20)		NOT NULL,
	Habilitado			Bit DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,
	CONSTRAINT PK_TELEFONO_SUCURSAL PRIMARY KEY(IdTelefonoSucursal),
	CONSTRAINT FK_TELEFONO_SUCURSAL FOREIGN KEY(IdSucursal) REFERENCES SUCURSAL(IdSucursal)
)
GO
CREATE TABLE BODEGA_SUCURSAL (
    IdBodegaS			INT IDENTITY(1,1),
	IdSucursal			INT					NOT NULL,
    Nombre				NVARCHAR(100)		NOT NULL,
    DescripcionLocal	NVARCHAR(200)		NULL,
    Habilitado			Bit 				NOT NULL	DEFAULT 1,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_IDINVENT PRIMARY KEY (IdBodegaS),
	CONSTRAINT FK_SUCURSAL_BODEGA FOREIGN KEY(IdBodegaS) REFERENCES SUCURSAL(IdSucursal)
);
GO
--CREATE TABLE DOCUMENTO_IDENTIFICACION (
--	IdDocumentoI		INT IDENTITY(1,1),
--	IdTipoDocumento		INT					NOT NULL,
--	Documento			NVARCHAR(50),
--	Habilitado			BIT					NOT NULL	DEFAULT 1,
--	CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
--	UpdateAt			SMALLDATETIME		NULL,
--	CONSTRAINT PK_DOCUMENTO	PRIMARY KEY(IdDocumentoI)
--)
GO
CREATE TABLE TRABAJADOR (
    IdTrabajador		INT IDENTITY(1,1),
    IdSucursal			INT					NULL,
    IdCargo				INT					NOT NULL,
    Nombres				NVARCHAR(50)		NOT NULL,
    Apellidos			NVARCHAR(50)		NOT NULL,
	IdTipoDocumento		INT					NOT NULL	DEFAULT 1,
    Documento			NVARCHAR(50)		NOT NULL,
	Imagen				NVARCHAR(50)		NOT NULL,
    FechaNacimiento		DATE				NOT NULL,
    Direccion			NVARCHAR(300)		NOT NULL,
	Telefono1			NVARCHAR(20)		NOT NULL,
	Telefono2			NVARCHAR(20)		NULL,
    FechaIngreso		DATE				NOT NULL,
    Habilitado			Bit DEFAULT 1		NOT NULL,
    CreatedAt			SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
    UpdateAt			SMALLDATETIME		NULL,
    CONSTRAINT PK_IDTRABAJ PRIMARY KEY (IdTrabajador),
    CONSTRAINT FK_TRABAJADOR_CARGO FOREIGN KEY (IdCargo)
        REFERENCES Cargo (IdCargo),
    CONSTRAINT FK_TRABAJADOR_SUCURSAL FOREIGN KEY (IdSucursal)
        REFERENCES SUCURSAL (IdSucursal),
	CONSTRAINT FK_TIPO_DOCUMENTO_IDENTIFICACION FOREIGN KEY(IdTipoDocumento)
		REFERENCES TIPO_DOCUMENTO_IDENTIFICACION(IdTipoDocumento),
	CONSTRAINT U_NumeroCedula UNIQUE(Documento),
	CONSTRAINT CK_TelefonosDistintos CHECK(Telefono1 <> Telefono2)
)
GO
--CREATE TABLE TELEFONO_TRABAJADOR(
--	IdTelefoNOTrabajador INT IDENTITY(1,1), 
--	IdTrabajador INT NOT NULL,
--	NumeroTelefono NVARCHAR(20) NOT NULL,
--	Habilitado Bit DEFAULT 1 NOT NULL,
--    CreatedAt SMALLDATETIME NOT NULL DEFAULT GETDATE(),
--    UpdateAt SMALLDATETIME NULL,
--	CONSTRAINT PK_TELEFONO_TRABAJADOR PRIMARY KEY(IdTelefoNOTrabajador),
--	CONSTRAINT FK_TELEFONO_TRABAJADOR FOREIGN KEY(IdTrabajador) REFERENCES TRABAJADOR(IdTrabajador)
--)
--GO
create TABLE AREA_PRODUCCION(
	IdAreaProduccion	INT IDENTITY(1,1),
	IdSucursal			INT					NOT NULL,
    Nombre				NVARCHAR(50)		NOT NULL,
    Habilitado			Bit					NOT NULL DEFAULT 1,
	CreateAt			SMALLDATETIME		NOT NULL DEFAULT GETDATE(),
	UpdateAt			SMALLDATETIME		NULL,
    constraint pk_IdAreaProduccion primary key(IdAreaProduccion), 
	CONSTRAINT FK_SUCURSAL_AREA_PRODUCCION FOREIGN KEY(IdSucursal) REFERENCES SUCURSAL(IdSucursal),
	CONSTRAINT U_SUCURSAL_AREA_PRODUCCION UNIQUE(IdSucursal)
)
GO
--NOMBRE ANTERIOR BODEGA_AREA_PRODUCCION
create table BODEGA_AREA_PRODUCCION(
	IdBodegaAreaP			INT IDENTITY(1,1),
	IdAreaProduccion		INT					NOT NULL,
    Nombre					NVARCHAR(50)		NOT NULL,
    Descripcion				NVARCHAR(300)		NULL,
    Habilitado				Bit DEFAULT 1		NOT NULL,
	CreateAt				SMALLDATETIME		NOT NULL	DEFAULT GETDATE(),
	UpdateAt				SMALLDATETIME		NULL,
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
INSERT INTO ESTADO_EDICION(NombreEstado)
VALUES('Abierta'),('Cerrada')
GO
CREATE TABLE ENTRADA_BODEGA_AREA_PRODUCCION (
    IdEntradaBodegaAP			INT IDENTITY,
    IdBodegaAreaP				INT				NOT NULL,
    IdTrabajador				INT				NOT NULL,
	IdProveedor					INT				NOT NULL,
	IdEstadoEdicion				INT				NOT NULL	DEFAULT 1,
	NFactura					NVARCHAR(20)	NOT NULL,
	RepresentanteProveedor		NVARCHAR(50)	NOT NULL,
	SubTotalFactura				MONEY			NULL		CHECK(SubTotalFactura > 0),
	PorcRetencion				NUMERIC(10,5)	NULL,
	Retencion					MONEY			NULL,
	PorcIva						NUMERIC(10,5)	NULL,
	IvaTotal					MONEY			NULL,
	PorcDescuento				NUMERIC(10,5)	NULL,
	DescuentoTotal				MONEY			NULL		CHECK(DescuentoTotal >= 0),
	TotalFactura				MONEY			NULL,
	FechaHora					SMALLDATETIME	NOT NULL,
    Habilitado					BIT				NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME	NOT NULL	DEFAULT 1,
    UpdateAt					SMALLDATETIME	NULL,
    constraint pk_IdEntradaBodega primary key(IdEntradaBodegaAP),
    constraint fk_BodegaEntradaB foreign key(IdBodegaAreaP) references BODEGA_AREA_PRODUCCION(IdBodegaAreaP),
	constraint fk_ENTRADA_BAP_EDICION FOREIGN KEY(IdEstadoEdicion) references ESTADO_EDICION(IdEstadoEdicion),
	constraint fk_ProveedorEntradaProducto foreign key(IdProveedor) REFERENCES PROVEEDOR(IdProveedor),
    constraint fk_TrabIngreEntradaB foreign key(IdTrabajador) references TRABAJADOR(IdTrabajador)
);
GO
CREATE TABLE DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION (
    IdDetalleEntradaAP			INT IDENTITY(1,1),
    IdEntradaBodegaAP			INT					NOT NULL,
    IdProductoProveedor			INT					NOT NULL,
    Cantidad					INT					NOT NULL,
	PrecioUnitarioEntrada		MONEY				NOT NULL	CHECK(PrecioUnitarioEntrada >=0),
	PrecioUnitarioActual		MONEY				NOT NULL,
	DescuentoCalculado			MONEY				NOT NULL,
    Habilitado					BIT					NOT NULL	DEFAULT 1,
    CreatedAt					SMALLDATETIME		NOT NULL	DEFAULT 1,
    UpdateAt					SMALLDATETIME		NULL,
    constraint Pk_DetalleEntradaInv PRIMARY KEY (IdDetalleEntradaAP , IdEntradaBodegaAP),
    CONSTRAINT FK_DetalleEntrada FOREIGN KEY (IdEntradaBodegaAP) REFERENCES ENTRADA_BODEGA_AREA_PRODUCCION(IdEntradaBodegaAP),
    CONSTRAINT FK_Producto_EntradaInvent FOREIGN KEY (IdProductoProveedor) REFERENCES PRODUCTO_PROVEEDOR(IdProductoProveedor)
);
GO
--NOMBRE ANTERIOR 
create table DETALLE_BODEGA_AP(
	IdDetalle			INT IDENTITY(1,1),
	IdBodegaAreaP		INT					NOT NULL,
	IdDetalleEntradaAP	INT					NOT NULL,-- PAra saber que producto de que detalle
	IdEntradaBodegaAP	INT					NOT NULL,--
    IdProductoProveedor	INT					NOT NULL,
	IdEstadoEmpaque		INT					NOT NULL,
    Cantidad			INT					NOT NULL	check(Cantidad >= 0),
    FechaHoraIngreso	SMALLDATETIME		NOT NULL,
    FechaHoraProduccion SMALLDATETIME		NULL,
    Habilitado			Bit					NOT NULL	DEFAULT 1,
    constraint pk_IdDetalleBodega primary key(IdDetalle,IdBodegaAreaP),	
    constraint FK_BodegaDelleAP foreign key(IdBodegaAreaP) 
		REFERENCES BODEGA_AREA_PRODUCCION(IdBodegaAreaP),
	constraint FK_DetalleEntradaBodegaAP foreign key(IdDetalleEntradaAP,IdEntradaBodegaAP) 
		REFERENCES DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION(IdDetalleEntradaAP,IdEntradaBodegaAP),
    constraint FK_IdProducto foreign key(IdProductoProveedor) references dbo.PRODUCTO_PROVEEDOR(IdProductoProveedor),
	constraint FK_EstadoEmpaqueProductoBodega FOREIGN KEY(IdEstadoEmpaque) REFERENCES ESTADO_EMPAQUE(IdEstadoEmpaque)
)