USE pruebas_node;
GO
CREATE TABLE ENTRADA_BODEGA_CENTRAL (
    IdEntrada INT IDENTITY(1,1),
    IdBodega INT not null,
	IdTrabajador INT NOT NULL,
	IdProveedor INT NOT NULL,
    NFactura NVARCHAR(20) NOT NULL,
	RepresentanteProveedor NVARCHAR(50) NOT NULL,
	FechaHora DATETIME NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint pk_IdENTRADA_BODEGA_CENTRAL primary key(IdEntrada),
	CONSTRAINT u_NumeroFactura UNIQUE(NFactura),
	CONSTRAINT FK_ENTRADA_PRODUCTO FOREIGN KEY(IdProveedor) REFERENCES PROVEEDOR(IdProveedor),
    constraint fk_BodegaEntradaBC foreign key(IdBodega) references BodegaCentral(IdBodega),
    constraint fk_TrabIngreEntradaBC foreign key(IdTrabajador) references Trabajador(IdTrabajador)
);
GO
CREATE TABLE DETALLE_ENTRADA_BODEGA_CENTRAL (
    IdDetalle INT IDENTITY(1,1),
    IdEntrada INT NOT NULL,
    IdDetalleAp int null,
    IdBodegaAp int null,
    IdProductoProveedor INT not null,
    Cantidad INT NOT NULL,
	PrecioCompra MONEY NOT NULL CHECK(PrecioCompra > 0),
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint Pk_DetalleEntradaInv PRIMARY KEY (IdDetalle , IdEntrada),
    CONSTRAINT FK_DetalleEntradaBC FOREIGN KEY (IdEntrada) REFERENCES ENTRADA_BODEGA_CENTRAL(IdEntrada),
    constraint fk_DetalleProdAP foreign key(IdDetalleAp,IdBodegaAp) references DETALLE_BODEGA_AREA_PRODUCCION(IdDetalle,IdBodega),
    CONSTRAINT FK_Producto_EntradaBC FOREIGN KEY (IdProducto) REFERENCES PRODUCTO_PROVEEDOR(IdProductoProveedor),
	constraint fk_ProdenciaEntradaBodegaC foreign key(IdProcedencia) references Procedencia(IdProcedencia)
);
GO
CREATE TABLE ENTRADA_BODEGA_AREA_PRODUCCION (
    IdEntrada INT IDENTITY,
    IdBodega INT not null,
    FechaHora DATETIME NOT NULL,
    IdTrabajador INT NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint pk_IdEntradaBodega primary key(IdEntrada),
    constraint fk_BodegaEntradaB foreign key(IdBodega) references BodegaAreaProduccion(IdBodega),
    constraint fk_TrabIngreEntradaB foreign key(IdTrabajador) references Trabajador(IdTrabajador)
);
GO
CREATE TABLE DETALLE_ENTRADA_BODEGA_AREA_PRODUCCION (
    IdDetalle INT IDENTITY(1,1),
    IdEntrada INT NOT NULL,
    IdDetalleBc int not null,
    IdBodegaBc int not null,
    IdProducto INT NOT NULL,
    Cantidad INT NOT NULL,
    IdProcedencia int not null,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint Pk_DetalleEntradaInv PRIMARY KEY (IdDetalle , IdEntrada),
    CONSTRAINT FK_DetalleEntrada FOREIGN KEY (IdEntrada) REFERENCES ENTRADA_BODEGA_AREA_PRODUCCION(IdEntrada),
    CONSTRAINT FK_ProductoDet_EntradaInvent FOREIGN KEY (IdDetalleBc,IdBodegaBc) REFERENCES DetalleBodegaCentral(IdDetalle,IdBodega),
    CONSTRAINT FK_Producto_EntradaInvent FOREIGN KEY (IdProducto) REFERENCES Producto (IdProducto),
	constraint fk_ProdenciaEntradaBodega foreign key(IdProcedencia) references Procedencia(IdProcedencia)
);
GO
Create table SALIDA_BODEGA_CENTRAL(
	IdSalida int IDENTITY(1,1),
    FechaHora datetime not null,
    IdTrabajador int not null,
    IdDetalleBC int not null,
    IdBodega int not null,
    Cantidad int not null,
    IdMotivo int not null,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint pk_IdDescuentoBodega primary key(Idsalida),
    constraint fk_IdTrabajador foreign key(IdTrabajador) references Trabajador(IdTrabajador),
    constraint fk_ProductoDescBC foreign key(IdDetalleBC,IdBodega) references DetalleBodegaCentral(IdDetalle,IdBodega),
    constraint fk_MOTIVO_DESCUENTOBC foreign key(IdMotivo) references MOTIVO_DESCUENTO(IdMotivo),
    constraint Ch_CantidadDescBC Check(Cantidad > 0)
);
GO
Create table SALIDA_BODEGA_AREA_PRODUCTO(
	IdSalida int IDENTITY(1,1),
    FechaHora datetime not null,
    IdTrabajador int not null,
    IdDetalleBAP int not null,
    IdBodega int not null,
    Cantidad int not null,
    IdMotivo int not null,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint pk_IdDescuentoBodega primary key(Idsalida),
	constraint fk_TrabajadorSalidadBAP foreign key(IdTrabajador) references TRABAJADOR(IdTrabajador),
    constraint fk_ProductoDescBAP foreign key(IdDetalleBAP,IdBodega) references DETALLE_BODEGA_AREA_PRODUCCION(IdDetalle,IdBodega),
    constraint fk_MOTIVO_DESCUENTO_AREA_PRODUCCION foreign key(IdMotivo) references MOTIVO_DESCUENTO(IdMotivo),
    constraint Ch_CantidadDescAP Check(Cantidad > 0)
);
GO
Create table SALIDA_BODEGA_SUCURSAL(
	IdSalida int IDENTITY(1,1),
	FechaHora datetime not null,
    IdTrabajador int not null,
	IdDetalleBS int not null, 
    IdBodega int not null, 
    Cantidad int not null,
    IdMotivo int not null,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT 1,
    UpdateAt DATETIME NULL,
    constraint pk_IdDescuentoInventarioS primary key(Idsalida),
    constraint fk_IdTrabajadorSIS foreign key(IdTrabajador) references TRABAJADOR(IdTrabajador),
    constraint fk_ProductoDescIS foreign key(IdDetalleBS,IdBodega) references DETALLE_BODEGA_SUCURSAL(IdDetalle,IdBodega),
    constraint fk_MOTIVO_DESCUENTOIS foreign key(IdMotivo) references MOTIVO_DESCUENTO(IdMotivo),
    constraint Ch_CantidadDescIS Check(Cantidad > 0)
);
GO