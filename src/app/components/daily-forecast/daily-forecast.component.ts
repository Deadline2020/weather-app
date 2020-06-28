import { Component, OnInit } from '@angular/core';

import { DailyForecastService } from './services/daily-forecast.service';

@Component({
	selector: 'app-daily-forecast',
	templateUrl: './daily-forecast.component.html',
	styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {

	constructor(
		public dailyForecast: DailyForecastService,
	) { }

	public ngOnInit(): void { }

}
