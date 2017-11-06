CREATE TABLE EntradaBodegaCentral (
    IdEntrada INT IDENTITY(1,1),
    IdBodega INT not null,
    FechaHora DATETIME NOT NULL,
    IdTrabajador INT,
    constraint pk_IdEntradaBodegaCentral primary key(IdEntrada),
    constraint fk_BodegaEntradaBC foreign key(IdBodega) references BodegaCentral(IdBodega),
    constraint fk_TrabIngreEntradaBC foreign key(IdTrabajador) references Trabajador(IdTrabajador)
);
GO
CREATE TABLE DetalleEntradaBodegaCentral (
    IdDetalle INT IDENTITY(1,1),
    IdEntrada INT,
    IdDetalleAp int null,
    IdBodegaAp int null,
    IdProducto INT not null,
    Cantidad INT NOT NULL,
    IdProcedencia int not null,
    constraint Pk_DetalleEntradaInv PRIMARY KEY (IdDetalle , IdEntrada),
    CONSTRAINT FK_DetalleEntradaBC FOREIGN KEY (IdEntrada) REFERENCES EntradaBodegaCentral(IdEntrada),
    constraint fk_DetalleProdAP foreign key(IdDetalleAp,IdBodegaAp) references DetalleBodegaAp(IdDetalle,IdBodega),
    CONSTRAINT FK_Producto_EntradaBC FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto),
	constraint fk_ProdenciaEntradaBodegaC foreign key(IdProcedencia) references Procedencia(IdProcedencia)
);
GO
CREATE TABLE EntradaBodegaAP (
    IdEntrada INT IDENTITY,
    IdBodega INT not null,
    FechaHora DATETIME NOT NULL,
    IdTrabajador INT,
    constraint pk_IdEntradaBodega primary key(IdEntrada),
    constraint fk_BodegaEntradaB foreign key(IdBodega) references BodegaAreaProduccion(IdBodega),
    constraint fk_TrabIngreEntradaB foreign key(IdTrabajador) references Trabajador(IdTrabajador)
);
GO
CREATE TABLE DetalleEntradaBodegaAP (
    IdDetalle INT AUTO_INCREMENT,
    IdEntrada INT,
    IdDetalleBc int not null,
    IdBodegaBc int not null,
    IdProducto INT,
    Cantidad INT NOT NULL,
    IdProcedencia int not null,
    constraint Pk_DetalleEntradaInv PRIMARY KEY (IdDetalle , IdEntrada),
    CONSTRAINT FK_DetalleEntrada FOREIGN KEY (IdEntrada) REFERENCES EntradaBodegaAP(IdEntrada),
    CONSTRAINT FK_ProductoDet_EntradaInvent FOREIGN KEY (IdDetalleBc,IdBodegaBc) REFERENCES DetalleBodegaCentral(IdDetalle,IdBodega),
    CONSTRAINT FK_Producto_EntradaInvent FOREIGN KEY (IdProducto) REFERENCES Producto (IdProducto),
	constraint fk_ProdenciaEntradaBodega foreign key(IdProcedencia) references Procedencia(IdProcedencia)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

Create table SalidaBodegaCentral(
	IdSalida int auto_increment,
    FechaHora datetime not null,
    IdTrabajador int not null,
    IdDetalleBC int not null,
    IdBodega int not null,
    Cantidad int not null,
    IdMotivo int not null,
    constraint pk_IdDescuentoBodega primary key(Idsalida),
    constraint fk_IdTrabajador foreign key(IdTrabajador) references Trabajador(IdTrabajador),
    constraint fk_ProductoDescBC foreign key(IdDetalleBC,IdBodega) references DetalleBodegaCentral(IdDetalle,IdBodega),
    constraint fk_MotivoDescuentoBC foreign key(IdMotivo) references MotivoDescuento(IdMotivo),
    constraint Ch_CantidadDescBC Check(Cantidad > 0)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

Create table SalidaBodegaAP(
	IdSalida int IDENTITY(1,1),
    FechaHora datetime not null,
    IdTrabajador int not null,
    IdDetalleBAP int not null,
    IdBodega int not null,
    Cantidad int not null,
    IdMotivo int not null,
    constraint pk_IdDescuentoBodega primary key(Idsalida),
	constraint fk_TrabajadorSalidadBAP foreign key(IdTrabajador) references Trabajador(IdTrabajador),
    constraint fk_ProductoDescBAP foreign key(IdDetalleBAP,IdBodega) references DetalleBodegaAP(IdDetalle,IdBodega),
    constraint fk_MotivoDescuentoAP foreign key(IdMotivo) references MotivoDescuento(IdMotivo),
    constraint Ch_CantidadDescAP Check(Cantidad > 0)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;

Create table SalidaBodegaSucursal(
	IdSalida int auto_increment,
	FechaHora datetime not null,
    IdTrabajador int not null,
	IdDetalleBS int not null, #
    IdBodega int not null, #
    Cantidad int not null,
    IdMotivo int not null,
    constraint pk_IdDescuentoInventarioS primary key(Idsalida),
    constraint fk_IdTrabajadorSIS foreign key(IdTrabajador) references Trabajador(IdTrabajador),
    constraint fk_ProductoDescIS foreign key(IdDetalleBS,IdBodega) references DetalleBodegaSucursal(IdDetalle,IdBodega),
    constraint fk_MotivoDescuentoIS foreign key(IdMotivo) references MotivoDescuento(IdMotivo),
    constraint Ch_CantidadDescIS Check(Cantidad > 0)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;