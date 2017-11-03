USE pruebas_node
GO
CREATE TABLE IF NOT EXISTS ClasificacionVenta(
	IdClasificacionVenta INT AUTO_INCREMENT,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NOT NULL,
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_IdClasifVenta PRIMARY KEY(IdClasificacionVenta)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
INSERT INTO ClasificacionVenta(Nombre,Descripcion) VALUES('En Local',NULL),('Para Llevar',NULL);
GO
CREATE TABLE IF NOT EXISTS TipoCliente(
	IdTipoCliente INT AUTO_INCREMENT,
	Nombre NVARCHAR(100) NOT NULL,
	Descripcion NVARCHAR(200) NULL,
	Habilitado Bit default 1 not null,
    CONSTRAINT Pk_TipoCliente PRIMARY KEY(IdTipoCliente)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;
GO
INSERT INTO TipoCliente VALUES('Registrado',NULL),('Anonimo',null);
GO
CREATE TABLE IF NOT EXISTS Cliente(
	IdCliente INT AUTO_INCREMENT,
	Nombres NVARCHAR(100) NOT NULL,
    Apellidos NVARCHAR(100) NULL,
    NCedulta NVARCHAR(20) NULL,
    Telefono Nvarchar(8) NULL,
    Direccion NVARCHAR(250),
	Habilitado Bit default 1 not null,
    CONSTRAINT PK_IdCliente PRIMARY KEY(IdCliente)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS EstadoVenta(
	IdEstadoVenta INT AUTO_INCREMENT,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    CONSTRAINT PK_IdEstadoVenta PRIMARY KEY(EstadoVenta)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

INSERT INTO EstadoVenta(Nombre,Descripcion) Values ('Cancelada',NULL),('Completada',NULL),('Pendiente',NULL);

CREATE TABLE IF NOT EXISTS Venta(
	IdVenta INT AUTO_INCREMENT,
    FechaHora DATETIME NOT NULL,
    IdTrabajador INT NOT NULL,
    IdClasificacionVenta INT NOT NULL,
    IdCliente INT NULL,
    IdEstadoVenta INT NOT NULL,
    NombreCliente NVARCHAR(100) NULL,
    Habilitado Bit default 1 not null,
    CONSTRAINT PK_IdVenta PRIMARY KEY(IdVenta),
    CONSTRAINT FK_TrabajadorVenta FOREIGN KEY(IdTrabajador) REFERENCES Trabajador(IdTrabajador),
    CONSTRAINT FK_ClasificacionVenta FOREIGN KEY(IdClasificacionVenta) REFERENCES ClasificacionVenta(IdClasificacionVenta),
    CONSTRAINT FK_ClienteVenta FOREIGN KEY(IdCliente) References Cliente(IdCliente),
    CONSTRAINT FK_EstadoVenta FOREIGN KEY(IdEstadoVenta) REFERENCES EstadoVenta(IdEstadoVenta)    
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS DetalleFactura(
	IdDetalle INT AUTO_INCREMENT,
	IdFactura INT NOT NULL,
    IdProductoF INT NOT NULL,
    Precio NUMERIC(6,2) NOT NULL,
    Cantidad INT NOT NULL check(Cantidad >0),
    Iva Numeric(6,2) NOT NULL,
    Descuento Numeric(6,2) NOT NULL check(Descuento >=0),
	Subtotal Numeric(6,2) AS ((Precio*Cantidad)+Iva-Descuento),
	Habilitado Bit default 1 not null,
    CONSTRAINT PK_IdDetalleFactura PRIMARY KEY(IdDetalle),
    CONSTRAINT FK_FacturaDetalle FOREIGN KEY(IdFactura) REFERENCES Factura(IdFactura)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS Factura(
	IdFactura INT AUTO_INCREMENT,
    IdVenta INT NOT NULL,
    IdMetodoPago INT NOT NULL,
    FechaHora DATETIME NOT NULL,
    Total NUMERIC(6,2) NOT NULL,
    Abono NUMERIC(6,2) NOT NULL,
	Habilitado Bit default 1 not null,
	CONSTRAINT Pk_Factura PRIMARY KEY(IdFactura),
    CONSTRAINT FK_VentaFactura FOREIGN KEY(IdVenta) REFERENCES Venta(IdVenta),
    CONSTRAINT FK_MetodoPago FOREIGN KEY(IdMetodoPago) REFERENCES MetodoPago(IdMetodoPago)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS TipoProductoFina(
	IdTipo INT AUTO_INCREMENT,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Habilitado Bit default 1 not null,
    CONSTRAINT Pk_TipoProductoF PRIMARY KEY(IdTipo)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS ProductoFinal(
	IdProductoF INT AUTO_INCREMENT,
	IdTipo INT NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
    Imagen NVARCHAR(250) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Precio NUMERIC(6,2) NOT NULL CHECK(Precio >= 0),
	Habilitado Bit default 1 not null,
    CONSTRAINT Pk_ProductoFinal PRIMARY KEY(IdProductoF),
    CONSTRAINT FK_TipoProductoF FOREIGN KEY(IdTipo) REFERENCES TipoProductoFinal(IdTipo)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS Ingredientes(
	IdIngrediente INT AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    CONSTRAINT Pk_IngredienteProductoF PRIMARY KEY(IdIngrediente)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS IngredientesProductos(
	IdProductoF INT NOT NULL,
    IdIngrediente INT NOT NULL,
    CONSTRAINT Fk_ProductoIngredienteF FOREIGN KEY(IdProductoF) REFERENCES ProductoFinal(IdProductoF),
    CONSTRAINT Fk_IngredienteProductoF FOREIGN KEY(IdIngrediente) REFERENCES Ingredientes(IdIngrediente),
    CONSTRAINT Pk_IngredientesProductos PRIMARY KEY(IdProductoF,IdIngrediente)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS EstadoComanda(
	IdEstadoComanda INT AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200)  NULL,
    CONSTRAINT Pk_EstadoComanda PRIMARY KEY(EstadoComanda)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

INSERT INTO EstadoComanda(Nombre,Descripcion) VALUES('Generada',NULL),('Enviada',NULL)
,('En Proceso',NULL),('Finalizada',NULL),('Cancelada',NULL);

CREATE TABLE IF NOT EXISTS Comanda(
	IdComanda INT AUTO_INCREMENT,
    IdTrabajador INT NOT NULL,
    IdEstadoComanda INT NOT NULL,
    FechaHora DATETIME NOT NULL,
    CONSTRAINT Pk_Comanda PRIMARY KEY(IdComanda),
    CONSTRAINT Fk_TrabajadorComanda FOREIGN KEY(IdTrabajador) REFERENCES Trabajador(IdTrabajador),
	CONSTRAINT Fk_EstadoComanda FOREIGN KEY(IdEstadoComanda) REFERENCES EstadoComanda(EstadoComanda)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS DetalleComanda(
	IdDetalle  INT AUTO_INCREMENT,
    IdComanda INT NOT NULL,
    IdProductoF INT NOT NULL,
	Comentarios NVARCHAR(100) NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    CONSTRAINT Pk_DetalleComanda PRIMARY KEY(IdDetalle),
    CONSTRAINT Fk_ComandaDetalleC FOREIGN KEY(IdComanda) REFERENCES Comanda(IdComanda),
    CONSTRAINT FK_ProductoFComanda FOREIGN KEY(IdProductoF) REFERENCES ProductoFinal(IdProductoF)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

-- CREATE TABLE IF NOT EXISTS PersonalizacionIngredientes(
-- 	IdPersonalizacion INT AUTO_INCREMENT,
--     IdDetalle INT NOT NULL,
--     IdProductof INT NOT NULL,
--     IdIngrediente INT NOT NULL,
--     CONSTRAINT Pk_PersonalizacionIngredientes PRIMARY KEY(IdPersonalizacion),
--     CONSTRAINT Fk_ FOREIGN KEY() REFERENCES (),
--     CONSTRAINT Fk_ FOREIGN KEY() REFERENCES (),
--     CONSTRAINT Fk_ FOREIGN KEY() REFERENCES ()
-- ) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS EstadoMesa(
	IdEstado INT AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    CONSTRAINT Pk_EstadoMesa PRIMARY KEY(IdEstado)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

CREATE TABLE IF NOT EXISTS Mesa(
	IdMesa INT AUTO_INCREMENT,
    IdEstado INT NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
    Capacidad INT NOT NULL CHECK(Capacidad > 0),
    CONSTRAINT Pk_Mesa PRIMARY KEY(IdMesa),
    CONSTRAINT Fk_EstadoMesa FOREIGN KEY(IdEstado) REFERENCES EstadoMesa(IdEstado)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;