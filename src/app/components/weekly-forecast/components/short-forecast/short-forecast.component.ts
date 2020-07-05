import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IForecastShort } from 'src/app/models/forecast-short';

@Component({
	selector: 'app-short-forecast',
	templateUrl: './short-forecast.component.html',
	styleUrls: ['./short-forecast.component.scss']
})
export class ShortForecastComponent {

	@Input() public forecast: IForecastShort;
	@Output() public onClickHourlyForecast: EventEmitter<void> = new EventEmitter();

	public onClick = (): void => {
		this.onClickHourlyForecast.emit();
	}
}
