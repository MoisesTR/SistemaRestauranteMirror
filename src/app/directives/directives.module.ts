import { NgModule } from "@angular/core";
import { AcceptCharactersDirective } from "@app/directives/acceptcaracter.directive";
import { AlphanumericDirective } from "@app/directives/alphanumeric.directive";
import { NegOrPosNumbergDirective } from "@app/directives/negorposnumber.directive";
import { NumbersOnlyIntDirective } from "@app/directives/numbers-only-int.directive";
import { NumberOnlyDirective } from "@app/directives/onlynumber.directive";
import { NumberDirective } from "@app/directives/onlypositivenumber.directive";
import { ReportesDirective } from "@app/directives/reportes.directive";

@NgModule({
	imports: [],
	exports: [
		AcceptCharactersDirective,
		AlphanumericDirective,
		NegOrPosNumbergDirective,
		NumbersOnlyIntDirective,
		NumberOnlyDirective,
		NumberDirective,
		ReportesDirective
	],
	declarations: [
		AcceptCharactersDirective,
		AlphanumericDirective,
		NegOrPosNumbergDirective,
		NumbersOnlyIntDirective,
		NumberOnlyDirective,
		NumberDirective,
		ReportesDirective
	]
})
export class DirectivesModule {}
