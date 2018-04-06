USE pruebas_node;
GO
create TABLE AREA_PRODUCCION(
	IdAreaProduccion int IDENTITY(1,1),
	IdSucursal INT NOT NULL,
    Nombre NVARCHAR(50) NOT NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
	CreateAt SMALLDATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt SMALLDATETIME NULL,
    constraint pk_IdAreaProduccion primary key(IdAreaProduccion), 
	CONSTRAINT FK_SUCURSAL_AREA_PRODUCCION FOREIGN KEY(IdSucursal) REFERENCES SUCURSAL(IdSucursal),
	CONSTRAINT U_SUCURSAL_AREA_PRODUCCION UNIQUE(IdSucursal)
)
GO
--NOMBRE ANTERIOR BODEGA_AREA_PRODUCCION
create table BODEGA_AREA_PRODUCCION(
	IdBodegaAreaP int IDENTITY(1,1),
	IdAreaProduccion INT NOT NULL,
    Nombre NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(300) NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
	CreateAt SMALLDATETIME NOT NULL DEFAULT GETDATE(),
	UpdateAt SMALLDATETIME NULL,
    constraint pk_IdBodegaAP primary key(IdBodegaAreaP),
	constraint FK_BODEGA_AREA_PRODUCCION foreign key(IdAreaProduccion) references AREA_PRODUCCION(IdAreaProduccion),
	constraint u_BODEA_PARA_AP UNIQUE(IdAreaProduccion)
)
GO
--NOMBRE ANTERIOR 
create table DETALLE_BODEGA_AP(
	IdDetalleBAp int IDENTITY(1,1),
	IdBodegaAreaP int NOT NULL,
    IdProductoProveedor int NOT NULL,
	IdEntradaBodegaAP INT NOT NULL,
    Cantidad int NOT NULL,
    FechaHoraIngreso SMALLDATETIME NOT NULL,
    FechaHoraProduccion SMALLDATETIME NULL,
    Habilitado Bit DEFAULT 1 NOT NULL,
    constraint pk_IdDetalleBodega primary key(IdDetalleBAp,IdBodegaAreaP),	
    constraint fk_BodegaDelleAP foreign key(IdBodegaAreaP) references BODEGA_AREA_PRODUCCION(IdBodegaAreaP),
    constraint fk_IdProducto foreign key(IdProductoProveedor) references PRODUCTO_PROVEEDOR(IdProductoProveedor)
)
GO
CREATE TABLE ENTRADA_BODEGA_CENTRAL (
    IdEntradaAp INT IDENTITY(1,1),
    IdBodega INT NOT NULL,
	IdTrabajador INT NOT NULL,
	IdProveedor INT NOT NULL,
    NFactura NVARCHAR(20) NOT NULL,
	RepresentanteProveedor NVARCHAR(50) NOT NULL,
	FechaHora SMALLDATETIME NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt SMALLDATETIME NOT NULL DEFAULT 1,
    UpdateAt SMALLDATETIME NULL,
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
    IdDetalleAp int NULL,
    IdBodegaAp int NULL,
    IdProductoProveedor INT NOT NULL,
    Cantidad INT NOT NULL,
	PrecioCompra MONEY NOT NULL CHECK(PrecioCompra > 0),
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt SMALLDATETIME NOT NULL DEFAULT 1,
    UpdateAt SMALLDATETIME NULL,
    constraint Pk_DetalleEntradaInv PRIMARY KEY (IdDetalle , IdEntrada),
    CONSTRAINT FK_DetalleEntradaBC FOREIGN KEY (IdEntrada) REFERENCES ENTRADA_BODEGA_CENTRAL(IdEntrada),
    constraint fk_DetalleProdAP foreign key(IdDetalleAp,IdBodegaAp) references DETALLE_BODEGA_AREA_PRODUCCION(IdDetalle,IdBodega),
    CONSTRAINT FK_Producto_EntradaBC FOREIGN KEY (IdProducto) REFERENCES PRODUCTO_PROVEEDOR(IdProductoProveedor),
	constraint fk_ProdenciaEntradaBodegaC foreign key(IdProcedencia) references Procedencia(IdProcedencia)
);
GO
Create table SALIDA_BODEGA_CENTRAL(
	IdSalida int IDENTITY(1,1),
    FechaHora SMALLDATETIME NOT NULL,
    IdTrabajador int NOT NULL,
    IdDetalleBC int NOT NULL,
    IdBodega int NOT NULL,
    Cantidad int NOT NULL,
    IdMotivo int NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt SMALLDATETIME NOT NULL DEFAULT 1,
    UpdateAt SMALLDATETIME NULL,
    constraint pk_IdDescuentoBodega primary key(Idsalida),
    constraint fk_IdTrabajador foreign key(IdTrabajador) references Trabajador(IdTrabajador),
    constraint fk_ProductoDescBC foreign key(IdDetalleBC,IdBodega) references DetalleBodegaCentral(IdDetalle,IdBodega),
    constraint fk_MOTIVO_DESCUENTOBC foreign key(IdMotivo) references MOTIVO_DESCUENTO(IdMotivo),
    constraint Ch_CantidadDescBC Check(Cantidad > 0)
);
GO

Create table SALIDA_BODEGA_AREA_PRODUCTO(
	IdSalida int IDENTITY(1,1),
    FechaHora SMALLDATETIME NOT NULL,
    IdTrabajador int NOT NULL,
    IdDetalleBAP int NOT NULL,
    IdBodega int NOT NULL,
    Cantidad int NOT NULL,
    IdMotivo int NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt SMALLDATETIME NOT NULL DEFAULT 1,
    UpdateAt SMALLDATETIME NULL,
    constraint pk_IdDescuentoBodega primary key(Idsalida),
	constraint fk_TrabajadorSalidadBAP foreign key(IdTrabajador) references TRABAJADOR(IdTrabajador),
    constraint fk_ProductoDescBAP foreign key(IdDetalleBAP,IdBodega) references DETALLE_BODEGA_AREA_PRODUCCION(IdDetalle,IdBodega),
    constraint fk_MOTIVO_DESCUENTO_AREA_PRODUCCION foreign key(IdMotivo) references MOTIVO_BAJA_PRODUCTO(IdMotivo),
    constraint Ch_CantidadDescAP Check(Cantidad > 0)
);
GO
Create table SALIDA_BODEGA_SUCURSAL(
	IdSalida int IDENTITY(1,1),
	FechaHora SMALLDATETIME NOT NULL,
    IdTrabajador int NOT NULL,
	IdDetalleBS int NOT NULL, 
    IdBodega int NOT NULL, 
    Cantidad int NOT NULL,
    IdMotivo int NOT NULL,
    Habilitado BIT NOT NULL DEFAULT 1,
    CreatedAt SMALLDATETIME NOT NULL DEFAULT 1,
    UpdateAt SMALLDATETIME NULL,
    constraint pk_IdDescuentoInventarioS primary key(Idsalida),
    constraint fk_IdTrabajadorSIS foreign key(IdTrabajador) references TRABAJADOR(IdTrabajador),
    constraint fk_ProductoDescIS foreign key(IdDetalleBS,IdBodega) references DETALLE_BODEGA_SUCURSAL(IdDetalle,IdBodega),
    constraint fk_MOTIVO_DESCUENTO foreign key(IdMotivo) references MOTIVO_DESCUENTO(IdMotivo),
    constraint Ch_CantidadDescIS Check(Cantidad > 0)
);
GO