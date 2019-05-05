import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
import { BreadCrumb } from "@app/models/interface/breadcrumb";
import { distinctUntilChanged, filter, map, startWith } from "rxjs/operators";

@Component({
	selector: "app-breadcrumb",
	templateUrl: "./breadcrumb.component.html",
	styleUrls: ["./breadcrumb.component.scss"]
})
export class BreadcrumbComponent implements OnInit {
	label: string;

	breadcrumbs$ = this.router.events.pipe(
		filter(event => event instanceof NavigationEnd),
		distinctUntilChanged(),
		map(event => this.buildBreadCrumb(this.activatedRoute.firstChild)),
		startWith(this.buildBreadCrumb(this.activatedRoute.firstChild))
	);
	constructor(private router: Router, private activatedRoute: ActivatedRoute, public title: Title, public meta: Meta) {}

	ngOnInit() {}

	buildBreadCrumb(route: ActivatedRoute, url: string = "", breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
		//If no routeConfig is avalailable we are on the root path
		const label = route.routeConfig ? route.routeConfig.data["titulo"] : "Inicio";
		const path = route.routeConfig ? route.routeConfig.path : "";
		//In the routeConfig the complete path is not available,
		//so we rebuild it each time
		const nextUrl = `${url}${path}/`;
		const breadcrumb = {
			label: label,
			url: nextUrl
		};
		const newBreadcrumbs = [...breadcrumbs, breadcrumb];
		if (route.firstChild) {
			//If we are not on our current path yet,
			//there will be more children to look after, to build our breadcumb
			return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
		}
		return newBreadcrumbs;
	}
}
