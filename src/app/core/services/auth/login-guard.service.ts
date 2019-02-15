import { CanActivate, Router } from "@angular/router";
import { AuthService } from "@app/core/services/auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuardService implements CanActivate {
	constructor(public auth: AuthService, public router: Router) {}

	canActivate(): boolean {
		if (this.auth.isAuthenticated()) {
			this.router.navigate(["/dashboard"]);
			return false;
		}
		return true;
	}
}
