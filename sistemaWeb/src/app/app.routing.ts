/*
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Importar componentes
import {LandingComponent} from './components/landing/landing.component';
import {ClasificacionComponent} from './components/clasificacion/clasificacion.component';

const appRoutes: Routes = [

  // Configuracion de la ruta en json
  // La ruta inicial cuando no tenga nada nos cargara el url de empleado
  {path: '', redirectTo: 'clasificacion', pathMatch: 'full' },
  {path: 'cerrarSesion', component: LandingComponent},
  {path: 'clasificacion', component: ClasificacionComponent}

  //  por defecto cuando se produzca un error(es decir cuando no exista un componente buscado en la URL)


];

export const appRoutingProviders: any[] = [];
// CON ESTE METODO LE DIREMOS QUE ARRAY DE RUTAS TIENE QUE CARGAR
// Para que coja toda estas rutas que le indicamos, la introduzca y inyecte en la configuracion de las rutas del framework
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


*/
