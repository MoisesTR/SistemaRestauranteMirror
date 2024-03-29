import {Injectable} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Observable} from 'rxjs';

@Injectable()
export class PersistenciaDatoService {
	constructor(private localStorage: LocalStorage) {}

	getPersistencia(Datos, PalabraClave: string) {
		return this.localStorage.setItem(PalabraClave, Datos).subscribe(res => {
			if (!res) {
				console.log("Problemas al guardar datos");
			}
		});
		//.pipe(switchMap(
		//  ()=> this.localStorage.getItem(PalabraClave)));
	}

	setPersistencia(PalabraClave: string): Observable<any> {
		return this.localStorage.getItem(PalabraClave);
	}

	deletePersistencia(PalabraClave) {
		this.localStorage.removeItemSubscribe(PalabraClave);
		this.localStorage.clearSubscribe();
	}

	deleteItems(){
		this.localStorage.clearSubscribe();
	}
}
