export class CategoriaProducto {
	public IdCategoria: number;
	public NombCategoria: string;
	public DescCategoria: string;
	public NombTipInsumo: string;

	public Habilitado: number;
	public disabled: number;
	public IdTipInsumo: number;

	constructor() {
		this.IdTipInsumo = 1;
	}
}
