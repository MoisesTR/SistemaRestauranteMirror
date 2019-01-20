import { Component, OnInit } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { Meta, MetaDefinition, Title } from "@angular/platform-browser";
import { filter } from "rxjs/operators";

@Component({
	selector: "app-breadcrumb",
	templateUrl: "./breadcrumb.component.html",
	styleUrls: ["./breadcrumb.component.scss"]
})
export class BreadcrumbComponent implements OnInit {
	label: string;
	constructor(private _router: Router, public title: Title, public meta: Meta) {

		this.getDataRoute().subscribe(data => {
			this.label = data.titulo;
			this.title.setTitle(this.label);

			const metaTag: MetaDefinition = {
				name: "descripcion",
				content: this.label
			};
			this.meta.updateTag(metaTag);
		});
	}

	ngOnInit() {}

	getDataRoute() {
		return this._router.events
			.pipe(filter(evento => evento instanceof ActivationEnd))
			.pipe(filter((evento: ActivationEnd) => evento.snapshot.firstChild === null))
			.map((evento: ActivationEnd) => evento.snapshot.data);
	}
}
