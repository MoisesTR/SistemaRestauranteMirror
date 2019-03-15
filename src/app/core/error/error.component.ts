import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '@app/core/service.index';

@Component({
	selector: "app-error",
	templateUrl: "./error.component.html",
	styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
	routeParams;
	constructor(private activatedRoute: ActivatedRoute, private injector: Injector) {}

	ngOnInit() {
		this.routeParams = this.activatedRoute.snapshot.queryParams;
	}

	home() {
	    console.log(this.routeParams.error);
	    const usuarioService = this.injector.get(UsuarioService);
        const router = this.injector.get(Router);
        localStorage.clear();
        usuarioService.identity = null;

        router.navigate(['/login']);
    }

}
