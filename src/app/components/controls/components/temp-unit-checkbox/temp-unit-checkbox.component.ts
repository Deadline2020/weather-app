import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-temp-unit-checkbox',
	templateUrl: './temp-unit-checkbox.component.html',
	styleUrls: ['./temp-unit-checkbox.component.scss']
})
export class TempUnitCheckboxComponent implements OnInit {

	@Input() public temperatureUnit: string;
	@Output() public onClickTempUnit: EventEmitter<string> = new EventEmitter();

	constructor() { }

	public ngOnInit(): void { }

	public onClick(unit: string): void {
		this.onClickTempUnit.emit(unit);
	}

}
