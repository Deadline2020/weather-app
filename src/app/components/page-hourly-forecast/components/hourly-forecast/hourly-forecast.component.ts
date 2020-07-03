import { Component, Input } from '@angular/core';
import { IForecastHour } from 'src/app/models/forecast-hour';

@Component({
	selector: 'app-hourly-forecast',
	templateUrl: './hourly-forecast.component.html',
	styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent {

	@Input() public forecast: IForecastHour;

}
