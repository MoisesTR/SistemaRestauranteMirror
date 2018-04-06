USE pruebas_node
GO
CREATE TABLE CLASIFICACION_VENTA(
	IdClasificacionVenta INT IDENTITY(1,1),
    Nombre				NVARCHAR(100) NOT NULL,
    Descripcion			NVARCHAR(200) NOT NULL,
    Habilitado			Bit DEFAULT 1 NOT NULL,
	CreatedAt			SMALLDATETIME DEFAULT GETDATE() NOT NULL,
    CONSTRAINT PK_IdClasifVenta PRIMARY KEY(IdClasificacionVenta)
);
GO
INSERT INTO CLASIFICACION_VENTA(Nombre,Descripcion) 
VALUES('En Local',NULL),('Para Llevar',NULL),('Delivery', NULL);
GO
CREATE TABLE TIPO_CLIENTE(
	IdTipoCliente INT IDENTITY(1,1),
	Nombre		NVARCHAR(100) NOT NULL,
	Descripcion NVARCHAR(200) NULL,
	Habilitado	Bit DEFAULT 1 NOT NULL,
	CreatedAt	SMALLDATETIME DEFAULT GETDATE() NOT NULL,
    CONSTRAINT Pk_TipoCliente PRIMARY KEY(IdTipoCliente)
);
GO
INSERT INTO TIPO_CLIENTE VALUES('Persona Natural',NULL),('Organizacion',NULL);
GO
CREATE TABLE CLIENTE(
	IdCliente		INT IDENTITY(1,1),
	Nombres			NVARCHAR(100) NOT NULL,
    Apellidos		NVARCHAR(100) NULL,
    IdTipoDocumento	INT NOT NULL,
	Documento		NVARCHAR(50) NOT NULL,
    Telefono		Nvarchar(20) NULL,
    Direccion		NVARCHAR(250),
	Habilitado		Bit DEFAULT 1 NOT NULL,
	CreatedAt		SMALLDATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT PK_IdCliente PRIMARY KEY(IdCliente),
) ;
GO
CREATE TABLE ESTADO_VENTA(
	IdEstadoVenta INT IDENTITY(1, 1),
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    CONSTRAINT PK_IdEstadoVenta PRIMARY KEY(EstadoVenta)
);
GO
INSERT INTO EstadoVenta(Nombre,Descripcion) Values ('Cancelada',NULL),('Completada',NULL),('Pendiente',NULL);
GO
CREATE TABLE VENTA(
	IdVenta INT IDENTITY(1,1),
    FechaHora DATETIME NOT NULL,
    IdTrabajador INT NOT NULL,
    IdClasificacionVenta INT NOT NULL,
    IdCliente INT NULL,
    IdEstadoVenta INT NOT NULL,
    NombreCliente NVARCHAR(100) NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    CONSTRAINT PK_IdVenta PRIMARY KEY(IdVenta),
    CONSTRAINT FK_TrabajadorVenta FOREIGN KEY(IdTrabajador) REFERENCES Trabajador(IdTrabajador),
    CONSTRAINT FK_ClasificacionVenta FOREIGN KEY(IdClasificacionVenta) REFERENCES ClasificacionVenta(IdClasificacionVenta),
    CONSTRAINT FK_ClienteVenta FOREIGN KEY(IdCliente) References Cliente(IdCliente),
    CONSTRAINT FK_EstadoVenta FOREIGN KEY(IdEstadoVenta) REFERENCES EstadoVenta(IdEstadoVenta)    
);
GO
CREATE TABLE FACTURA_VENTA(
	IdFacturaVenta	INT IDENTITY(1,1), 
	NFacturaDia		INT NOT NULL,
	IdVenta			INT NOT NULL
)

GO
CREATE TABLE DetalleFactura(
	IdDetalle INT IDENTITY(1, 1),
	IdFactura INT NOT NULL,
    IdProductoF INT NOT NULL,
    Precio NUMERIC(7, 3) NOT NULL,
    Cantidad INT NOT NULL check(Cantidad >0),
    Iva NUMERIC(7, 3) NOT NULL,
    Descuento NUMERIC(7, 3) NOT NULL check(Descuento >=0),
	Subtotal NUMERIC(7, 3) AS ((Precio*Cantidad)+Iva-Descuento),
	Habilitado Bit DEFAULT 1 NOT NULL,
    CONSTRAINT PK_IdDetalleFactura PRIMARY KEY(IdDetalle),
    CONSTRAINT FK_FacturaDetalle FOREIGN KEY(IdFactura) REFERENCES Factura(IdFactura)
);

CREATE TABLE FACTURA(
	IdFactura INT IDENTITY(1, 1),
    IdVenta INT NOT NULL,
    IdMetodoPago INT NOT NULL,
    FechaHora DATETIME NOT NULL,
    Total NUMERIC(7, 3) NOT NULL,
    Abono NUMERIC(7, 3) NOT NULL,
	Habilitado Bit DEFAULT 1 NOT NULL,
	CONSTRAINT Pk_Factura PRIMARY KEY(IdFactura),
    CONSTRAINT FK_VentaFactura FOREIGN KEY(IdVenta) REFERENCES Venta(IdVenta),
    CONSTRAINT FK_MetodoPago FOREIGN KEY(IdMetodoPago) REFERENCES MetodoPago(IdMetodoPago)
);

CREATE TABLE IF NOT EXISTS TipoProductoFina(
	IdTipo INT IDENTITY(1, 1),
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    CONSTRAINT Pk_TipoProductoF PRIMARY KEY(IdTipo)
);

CREATE TABLE IF NOT EXISTS ProductoFinal(
	IdProductoF INT IDENTITY(1, 1),
	IdTipo INT NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
    Imagen NVARCHAR(250) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Precio NUMERIC(7, 3) NOT NULL CHECK(Precio >= 0),
	Habilitado Bit DEFAULT 1 NOT NULL,
    CONSTRAINT Pk_ProductoFinal PRIMARY KEY(IdProductoF),
    CONSTRAINT FK_TipoProductoF FOREIGN KEY(IdTipo) REFERENCES TipoProductoFinal(IdTipo)
);

CREATE TABLE IF NOT EXISTS Ingredientes(
	IdIngrediente INT IDENTITY(1, 1),
    Nombre VARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    CONSTRAINT Pk_IngredienteProductoF PRIMARY KEY(IdIngrediente)
);

CREATE TABLE INGREDIENTES_PLATILLO(
	IdProductoF INT NOT NULL,
    IdIngrediente INT NOT NULL,
    CONSTRAINT Fk_ProductoIngredienteF FOREIGN KEY(IdProductoF) REFERENCES ProductoFinal(IdProductoF),
    CONSTRAINT Fk_IngredienteProductoF FOREIGN KEY(IdIngrediente) REFERENCES Ingredientes(IdIngrediente),
    CONSTRAINT Pk_IngredientesProductos PRIMARY KEY(IdProductoF,IdIngrediente)
);
GO
CREATE TABLE VENTA_ESTADO_COMANDA(
	IdEstadoCom INT IDENTITY(1, 1),
    NombreCom VARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200)  NULL,
    CONSTRAINT Pk_EstadoComanda PRIMARY KEY(EstadoComanda)
);
GO
INSERT INTO VETNTA_ESTADO_COMANDA(Nombre,Descripcion) VALUES('Generada',NULL),('Enviada',NULL)
,('En Proceso',NULL),('Finalizada',NULL),('Cancelada',NULL);

CREATE TABLE IF NOT EXISTS Comanda(
	IdComanda INT IDENTITY(1, 1),
    IdTrabajador INT NOT NULL,
    IdEstadoComanda INT NOT NULL,
    FechaHora DATETIME NOT NULL,
    CONSTRAINT Pk_Comanda PRIMARY KEY(IdComanda),
    CONSTRAINT Fk_TrabajadorComanda FOREIGN KEY(IdTrabajador) REFERENCES Trabajador(IdTrabajador),
	CONSTRAINT Fk_EstadoComanda FOREIGN KEY(IdEstadoComanda) REFERENCES EstadoComanda(EstadoComanda)
);
GO
CREATE TABLE COMANDA(
	IdDetalle  INT IDENTITY(1, 1),
    IdComanda INT NOT NULL,
    IdProductoF INT NOT NULL,
	Comentarios NVARCHAR(100) NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    CONSTRAINT Pk_DetalleComanda PRIMARY KEY(IdDetalle),
    CONSTRAINT Fk_ComandaDetalleC FOREIGN KEY(IdComanda) REFERENCES Comanda(IdComanda),
    CONSTRAINT FK_ProductoFComanda FOREIGN KEY(IdProductoF) REFERENCES ProductoFinal(IdProductoF)
);
GO
CREATE TABLE ESTADO_COCCION (
	IdEstadoC		INT IDENTITY(1,1),
	NombreEC		NVARCHAR(50) NOT NULL,
	DescripcionEC	NVARCHAR(50) NULL,
	Habilitado		BIT NOT NULL DEFAULT 1,
	CreatedAt		SMALLDATETIME NOT NULL DEFAULT GETDATE(),
	CONSTRAINT PK_ESTADO_COCCION PRIMARY KEY(IdEstadoC)
)
GO
-- CREATE TABLE IF NOT EXISTS PersonalizacionIngredientes(
-- 	IdPersonalizacion INT IDENTITY(1, 1),
--     IdDetalle INT NOT NULL,
--     IdProductof INT NOT NULL,
--     IdIngrediente INT NOT NULL,
--     CONSTRAINT Pk_PersonalizacionIngredientes PRIMARY KEY(IdPersonalizacion),
--     CONSTRAINT Fk_ FOREIGN KEY() REFERENCES (),
--     CONSTRAINT Fk_ FOREIGN KEY() REFERENCES (),
--     CONSTRAINT Fk_ FOREIGN KEY() REFERENCES ()
-- );

CREATE TABLE ESTADO_ATENCION(
	IdEstado INT IDENTITY(1, 1),
    Nombre VARCHAR(100) NOT NULL,
    CONSTRAINT Pk_EstadoMesa PRIMARY KEY(IdEstado)
);

CREATE TABLE MESA(
	IdMesa INT IDENTITY(1,1),
    IdEstado INT NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
    Capacidad INT NOT NULL CHECK(Capacidad > 0),
    CONSTRAINT Pk_Mesa PRIMARY KEY(IdMesa),
    CONSTRAINT Fk_EstadoMesa FOREIGN KEY(IdEstado) REFERENCES EstadoMesa(IdEstado)
);