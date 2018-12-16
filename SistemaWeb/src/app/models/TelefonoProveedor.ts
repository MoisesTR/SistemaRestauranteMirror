export class TelefonoProveedor {

    public IdTelefono: number;
    public IdProveedor: number;
    public Telefono: string;
    public Nombre: string;
    public Cargo: string;
    public IsTitular: boolean;
    public Extension: string;
    public Titular: number;
    public CreateAt: string;
    public UpdateAt: string;

    constructor() {
        this.IdTelefono = null;
        this.IdProveedor = null;
        this.Telefono = null;
        this.Nombre = null;
        this.Cargo = null;
        this.CreateAt = null;
        this.UpdateAt = null;
        this.IsTitular = false;
        this.Titular = 0;
        this.Extension = null;
    }
}
