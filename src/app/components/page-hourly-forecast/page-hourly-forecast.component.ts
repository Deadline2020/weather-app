import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import { IAppState } from 'src/app/store/state/app.state';
import { getHourlyForecast } from 'src/app/store/actions/forecast.actions';
import { FutureForecastService } from 'src/app/services/future-forecast.service';
import { AppService } from 'src/app/services/app.service';
import { RouterService } from 'src/app/services/router.service';
import { DictService } from 'src/app/services/translate-data.service';

@Component({
	selector: 'app-page-hourly-forecast',
	templateUrl: './page-hourly-forecast.component.html',
	styleUrls: ['./page-hourly-forecast.component.scss']
})
export class PageHourlyForecastComponent implements OnInit {
	public currentID: number;

	constructor(
		public appService: AppService,
		public futureForecastService: FutureForecastService,
		public routerService: RouterService,
		private _store: Store<IAppState>,
		public _dict: DictService,
		private _activatedRoute: ActivatedRoute,
	) {
		if (this.futureForecastService.isNewRequest) {
			this._store.dispatch(getHourlyForecast(
				{ latitude: this.futureForecastService.latitude, longitude: this.futureForecastService.longitude }
			));
		}
	}
	public ngOnInit(): void {
		this._activatedRoute.params
			.subscribe((params: Params) => {
				if (params) {
					const NUMBER_DAY_IN_WEEK: number = 7;
					const result: typeof NaN | number = parseInt(params.id, 10);
					if (Number.isNaN(result) || result < 0 || result > NUMBER_DAY_IN_WEEK) {
						this.routerService.goToNotFound();
					} else {
						this.currentID = parseInt(params.id, 10);
					}
				}
			});
	}
}
