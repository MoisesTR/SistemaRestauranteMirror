export class ContabilidadMovimientoCuenta {
	public IdMovimiento: number;
	public IdTipMov: number;
	public IdCuenta: number;
	public IdMoneda: number;
	public FechaMovimiento: Date;
	public Debe: number;
	public DebeMonLocal: number;
	public Haber: number;
	public HaberMonLocal: number;
	public Saldo: number;
	public SalgoMonLoca: number;
	public Habilitado: number;
	public CreatedAt: Date;
	public UpdatedAt: Date;

	constructor() {}
}
