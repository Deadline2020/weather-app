import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-temp-unit-checkbox',
	templateUrl: './temp-unit-checkbox.component.html',
	styleUrls: ['./temp-unit-checkbox.component.scss']
})
export class TempUnitCheckboxComponent {

	@Input() public temperatureUnit: string;
	@Output() public onClickTempUnit: EventEmitter<string> = new EventEmitter();

	public onClick(unit: string): void {
		this.onClickTempUnit.emit(unit);
	}
}
