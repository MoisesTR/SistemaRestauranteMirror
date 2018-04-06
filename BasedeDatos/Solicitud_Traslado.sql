use pruebas_node;
--PArte de la bodega de sucursal
GO
/* NOMBRE ANTERIOR NUMERO_TELEFONO_TRABAJADOR */
CREATE TABLE NUMERO_TELEFONO_TRABAJADOR(
    IdNumero INT IDENTITY(1,1),
    IdTrabajador int NOT NULL,
    IdOperadora int NOT NULL,
    NumeroTelefono NVARCHAR(8) NOT NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    CONSTRAINT PK_TELFTRAB PRIMARY KEY (IdNumero),
    CONSTRAINT FK_TrabajadorNTelefono FOREIGN KEY (IdTrabajador) REFERENCES TRABAJADOR(IdTrabajador),
    constraint fk_OperadoraTelefono foreign key(IdOperadora) references OPERADORA_TELEFONICA(IdOperadora)
)
GO
create table BODEGA_CENTRAL(
	IdBodegaC INT IDENTITY(1,1) NOT NULL,
	IdUbicacion INT NULL, --Es el id de la sucursal en que se encuentra
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(50),
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdBodegaAPCentral primary key(IdBodegaC),
	CONSTRAINT FK_UBICACION_BODEGA_CENTRAL FOREIGN KEY(IdUbicacion) REFERENCES SUCURSAL(IdSucursal) 
)
GO
create table DETALLE_BODEGA_CENTRAL(
	IdDetalle int IDENTITY(1,1),
    IdBodegaC int NOT NULL,
	IdProducto int NOT NULL,
    IdEstadoEm int NOT NULL,
    IdDetalleAP int NULL,
    IdBodegaAP int NULL,
	Cantidad int NOT NULL CHECK(Cantidad >= 0),
    Fecha date NOT NULL,
	Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdDetalleBC primary key(IdDetalle,IdBodegaC),
    constraint fk_BodegaDetalleBC foreign key(IdBodegaC) references BODEGA_CENTRAL(IdBodegaC),
    constraint fk_ProductoBC foreign key(IdProducto) references PRODUCTO(IdProducto),
    constraint fk_ProdProducAP foreign key(IdDetalleAp,IdBodegaAP) references DETALLE_BODEGA_AP(IdDetalle,IdBodegaAP),
    constraint fk_ProductoBodegaC foreign key(IdEstadoEm) references ESTADO_EMPAQUE(IdEstado)
)
GO
CREATE TABLE DETALLE_BODEGA_SUCURSAL (
	IdDetalle INT IDENTITY(1,1),
    IdBodegaAP INT NOT NULL,
    IdDetalleBc INT NOT NULL,
    IdBodegaAPBc INT NOT NULL,
    IdEstado INT NULL, --estado del empaque
	Cantidad INT NOT NULL,
    FechaIngreso SMALLDATETIME NOT NULL,
	Habilitado Bit DEFAULT 1 NOT NULL,
    CONSTRAINT PK_DETA_INVENT PRIMARY KEY (IdDetalle,IdBodegaAP),
    CONSTRAINT U_DETA_INVENT UNIQUE(IdDetalle,IdBodegaAP),
    --CONSTRAINT FK_PRO_EN_INVENT FOREIGN KEY (IdProducto)REFERENCES Producto (IdProducto),
    CONSTRAINT FK_PRO_EN_INVENT FOREIGN KEY (IdDetalleBc,IdBodegaAPBc)REFERENCES DETALLE_BODEGA_CENTRAL(IdDetalle,IdBodegaC),
    CONSTRAINT FK_INVENT_DETALL FOREIGN KEY (IdBodegaAP)
        REFERENCES BODEGA_SUCURSAL(IdBodegaS),
	CONSTRAINT FK_Producto_ESTADO FOREIGN KEY(IdEstado) REFERENCES EstadoEmpaque(IdEstado)
);

create table ESTADO_SOLICITUD(
	IdEstadoS int IDENTITY(1,1),
    NombreEstado NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdEstado Primary key(IdEstadoS)
)
go
INSERT INTO ESTADO_SOLICITUD(NombreEstado,Descripcion) VALUES('En Espera',NULL),('Aceptada',NULL),('Rechazada',NULL);
GO
create table SOLICITUD_PRODUCTOS(
	IdSolicitud int IDENTITY(1,1),
    IdSucursal int NOT NULL,
    IdSolicitante int NOT NULL,
    IdEstado int NOT NULL,
    FechaHora SMALLDATETIME NOT NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdSolicitud primary key(IdSolicitud),
    constraint pk_SucursalSolic foreign key(IdSucursal) references Sucursal(IdSucursal),
    constraint fk_TrabSolici foreign key(IdSolicitante) References Trabajador(IdTrabajador),
    constraint fk_ESTADO_SOLICITUD foreign key(IdEstado) references ESTADO_SOLICITUD(IdEstadoS)
)
GO
create table DETALLE_SOLICITUD(
	IdDetalleSo int IDENTITY(1,1),
    IdSolicitud int NOT NULL,
    IdProducto  int NOT NULL,
    Cantidad int NOT NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdDetalle primary key(IdDetalleSo),
    constraint fk_SolicitudDetalle foreign key(IdSolicitud) references SOLICITUD_PRODUCTOS(IdSolicitud),
    constraint fk_ProductoDetalle foreign key(IdProducto) references Producto(IdProducto),
    constraint Ch_CantidadSolicitud check(Cantidad > 0)
)
GO
create table ESTADO_TRASLADO(
	IdEstadoT int IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200) NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_ESTADO_TRASLADO primary key(IdEstadoT)
)
GO
INSERT INTO ESTADO_TRASLADO(Nombre,Descripcion) VALUES('Procesando','El traslado se esta procesando, se estan buscando los productos'),('En ejecucion','El traslado entre los inventarios se esta realizando.'),
('Finalizado','El traslado se ha realizado.'),('Finalizado Parcialmente','El traslado se realizo pero con perdidas de producto.'),('Cancelado','No se traslado ningun producto.');
GO
CREATE TABLE TIPO_TRASLADO(
	IdTipo INT IDENTITY(1,1),
    NombreTipo NVARCHAR(100) NOT NULL,
    DescripcionTipo NVARCHAR(200) NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    CONSTRAINT PK_TIPO_TRASLADO PRIMARY KEY(IdTipo)
);
GO
INSERT INTO TIPO_TRASLADO(NombreTipo,DescripcionTipo) VALUES('Interno','Traslado de productos entre inventarios de la misma Sucursal.'),
('Externo','Traslado de productos entre inventarios de distintas Sucursales.');
GO
create table TRASLADO(
	IdTraslado int IDENTITY(1,1),
    IdSucursal int NOT NULL,
    IdTrabIngreso int NOT NULL,
    IdSolicitante int NOT NULL,
    IdChofer int NOT NULL,
    IdReceptor int NOT NULL,
    IdTipo int NOT NULL,
    IdEstado int NOT NULL,
    FechaHora SMALLDATETIME NOT NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdTraslado primary key(IdTraslado),
    constraint fk_SucursalTraslado foreign key(IdSucursal) references SUCURSAL(IdSucursal),
    constraint fk_TrabIngresoTraslado foreign key(IdTrabIngreso) references TRABAJADOR(IdTrabajador),
    constraint fk_TrabSolicTraslado foreign key(IdSolicitante) references TRABAJADOR(IdTrabajador),
    constraint fk_ChoferTraslado foreign key(IdChofer) references TRABAJADOR(IdTrabajador),
    constraint fk_TrabRecibioTraslado foreign key(IdReceptor) references TRABAJADOR(IdTrabajador),
    constraint fk_TIPO_TRASLADO foreign key(IdTraslado) references TIPO_TRASLADO(IdTipo),
    constraint fk_ESTADO_TRASLADO foreign key(IdEstado) references ESTADO_TRASLADO(IdEstadoT)
)
GO
create table DETALLE_TRASLADO(
	IdDetalle int IDENTITY(1,1),
    IdTraslado int NOT NULL,
    IdDetalleBc int NOT NULL,
    IdBodegaAPC int NOT NULL,
    --IdProducto int NOT NULL,
    CantidadEnviada int NOT NULL,
    CantidadRecibida int NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdDetalleTraslado primary key(IdDetalle,IdTraslado),
    constraint fk_TrasladoDetalle foreign key(IdTraslado) references TRASLADO(IdTraslado),
    --constraint fk_ProductoTrasladado foreign key(IdProducto) references DETALLE_BODEGA_CENTRAL(IdProducto)
    constraint fk_ProductoTrasladado foreign key(IdDetalleBc,IdBodegaAPC) references DETALLE_BODEGA_CENTRAL(IdDetalle,IdBodegaC)
)
GO
create table PERDIDA_TRASLADO(
	IdPerdida int IDENTITY(1,1),
	IdTraslado int NOT NULL,
    IdEstado int NOT NULL,
    IdResponsable int NOT NULL,
    IdMotivo int NOT NULL,
	IdDetalleTra int NOT NULL,
    Cantidad int NOT NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_PerdidaTraslado primary key(IdPerdida),
    constraint fk_TrasladoPerdida foreign key(IdTraslado) references TRASLADO(IdTraslado),
    constraint fk_ResponsablePerdida foreign key(IdResponsable) references TRABAJADOR(IdTrabajador),
    constraint fk_MotivoDescuentoPerdida foreign key(IdMotivo) references MOTIVO_DESCUENTO(IdMotivoD),
    constraint fk_EstadoPerdida  foreign key(IdEstado) references ESTADO_TRASLADO(IdEstadoT),
    constraint fk_ProductoPerdido foreign key(IdDetalleTra,IdTraslado) references DetalleTraslado(IdDetalle,IdTraslado),
    constraint Ch_CantidadPerdidad check(Cantidad > 0)
)
GO
/* por si acaso
create table DetallePerdida(
	IdDetalle int IDENTITY(1,1),
    IdTraslado int NOT NULL,
    #IdProducto int NOT NULL,
    IdDetalleTra int NOT NULL,
    Cantidad int NOT NULL,
    constraint pk_IdDetallePerdida primary key(IdDetalle,IdTraslado),
    constraint fk_DetallePerdidaTraslado foreign key(IdTraslado) references PerdidaTraslado(IdTraslado),
    constraint fk_ProductoPerdido foreign key(IdDetalleTra,IdTraslado) references DetalleTraslado(IdDetalle,IdTraslado),
    constraint Ch_CantidadPerdidad check(Cantidad > 0)
)ENGINE=INNODB DEFAULT CHARSET=UTF8;*/
