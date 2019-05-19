import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	QueryList,
	Renderer2,
	ViewChild,
	ViewChildren
} from "@angular/core";
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from "ng-uikit-pro-standard";

@Component({
	selector: "app-testui",
	templateUrl: "./testui.component.html",
	styleUrls: ["./testui.component.scss"]
})
export class TestuiComponent implements OnInit, AfterViewInit {
	@ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
	@ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
	@ViewChildren("tablerow") tableRow: QueryList<ElementRef>;
	elements: any = [
		{ id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
		{ id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
		{ id: 3, first: "Larry", last: "the Bird", handle: "@twitter" }
	];

	headElements = ["Id", "First", "Last", "Handle"];
	findText: string = "";
	previo: string;

	@HostListener("input") oninput() {
		this.mdbTablePagination.searchText = this.findText;
		this.buscarItems();
	}

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.mdbTable.setDataSource(this.elements);
		this.elements = this.mdbTable.getDataSource();
		this.previo = this.mdbTable.getDataSource();
	}

	ngAfterViewInit(): void {
		this.mdbTablePagination.setMaxVisibleItemsNumberTo(2);

		this.mdbTablePagination.calculateFirstItemIndex();
		this.mdbTablePagination.calculateLastItemIndex();
		this.cdRef.detectChanges();

		this.headElements.forEach((value, index) => {
			let i = 0;
			this.tableRow.toArray().forEach((elem: any) => {
				const el = this.renderer.createElement("td");
				let text;
				if (index === 2) {
					text = this.renderer.createText(String(i));
				} else {
					text = this.renderer.createText(String(i + 2));
				}

				this.renderer.appendChild(el, text);
				this.renderer.appendChild(elem.nativeElement, el);
				i = i + 1;
			});
		});
	}

	buscarItems() {
		const prev = this.mdbTable.getDataSource();

		if (!this.findText) {
			this.mdbTable.setDataSource(this.previo);
			this.elements = this.mdbTable.getDataSource();
		}

		if (this.findText) {
			this.elements = this.mdbTable.searchLocalDataBy(this.findText);
			this.mdbTable.setDataSource(prev);
		}
	}

	metodo(value, event): string {
		if (value === "Id") return "id";
		if (value === "First") return "first";
		if (value === "Last") return "last";
		if (value === "Handle") return "handle";
	}
}
