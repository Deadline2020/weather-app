import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IForecastDay } from 'src/app/models/forecast-day';

@Component({
	selector: 'app-short-forecast',
	templateUrl: './short-forecast.component.html',
	styleUrls: ['./short-forecast.component.scss']
})
export class ShortForecastComponent {

	@Input() public forecast: IForecastDay;
	@Input() public numberForecast: number;
	@Output() public onClickHourlyForecast: EventEmitter<number> = new EventEmitter();

	public onClick = (): void => {
		this.onClickHourlyForecast.emit(this.numberForecast);
	}
}
