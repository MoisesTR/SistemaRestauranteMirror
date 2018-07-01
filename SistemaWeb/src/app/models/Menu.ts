export class Menu {

    public IdRecursoSistema : number;
    public IdMenuPadre : number;
    public Nombre : string;
    public Descripcion : string;
    public Ruta : string;
    public Icono : string;
    public Clase: string;
    public Orden : number;
    public Habilitado : number;
    public CreatedAt : string;
    public UpdateAt : string;
    public Submenues : Menu[];

    constructor(){

    }
}