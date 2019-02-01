import {Component, Input, OnInit} from '@angular/core';
import { SpinnerService } from "@app/core/services/shared/spinner.service";

@Component({
	selector: "spinner",
	templateUrl: "./spinner.component.html",
	styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent implements OnInit {
	public spinnerVisibilidad: boolean;

	@Input() titulo: string;
	constructor(private spinnerService: SpinnerService) {}

	ngOnInit() {
		this.spinnerService.status.subscribe((val: boolean) => {
			this.spinnerVisibilidad = val;
		});
	}
}
