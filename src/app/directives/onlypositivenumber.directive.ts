import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: 'input[onlyPositiveNumber]'
})
export class NumberDirective {
    private regexAcceOnlyNumber: RegExp = new RegExp(/^[0-9]*$/g);
    private specialKeys: Array<string> = ["Backspace", "Tab", "End", "Home"];
    constructor(private _el: ElementRef) { }

    @HostListener("keydown", ["$event"]) onKeyDown(e: KeyboardEvent): boolean {
        const current: string = this._el.nativeElement.value;
        const next: string = current.concat(e.key);

        if (this.specialKeys.indexOf(e.key) !== -1) {
            return;
        }

        if (next && !String(next).match(this.regexAcceOnlyNumber)) {
            event.preventDefault();
        }
    }
}
