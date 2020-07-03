import { Component } from '@angular/core';

import { DailyForecastService } from './services/daily-forecast.service';

@Component({
	selector: 'app-daily-forecast',
	templateUrl: './daily-forecast.component.html',
	styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent {

	constructor(
		public dailyForecastService: DailyForecastService,
	) { }
}
