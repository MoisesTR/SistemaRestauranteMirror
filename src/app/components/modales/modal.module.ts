import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {ModalCategoriaComponent} from '@app/components/modales/modal-categoria/modal-categoria.component';
import {ModalClasificacionComponent} from '@app/components/modales/modal-clasificacion/modal-clasificacion.component';
import {ModalEmpaqueComponent} from '@app/components/modales/modal-empaque/modal-empaque.component';
import {ModalEnvaseComponent} from '@app/components/modales/modal-envase/modal-envase.component';
import {ModalSubclasificacionComponent} from '@app/components/modales/modal-subclasificacion/modal-subclasificacion.component';
import {ModalUnidadMedidaComponent} from '@app/components/modales/modal-unidad-medida/modal-unidad-medida.component';
import {SharedModule} from '@app/components/shared-module/shared.module';

@NgModule({
	imports: [SharedModule],
	declarations: [
		ModalCategoriaComponent,
		ModalClasificacionComponent,
		ModalEmpaqueComponent,
		ModalEnvaseComponent,
		ModalSubclasificacionComponent,
		ModalUnidadMedidaComponent
	],
	exports: [
	    SharedModule,
		ModalCategoriaComponent,
		ModalClasificacionComponent,
		ModalEmpaqueComponent,
		ModalEnvaseComponent,
		ModalSubclasificacionComponent,
		ModalUnidadMedidaComponent
	],
	schemas: [NO_ERRORS_SCHEMA]
})
export class ModalModule {}
