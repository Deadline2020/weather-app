import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {

	constructor(
		private _router: Router,
	) { }

	public goToHourlyForecast = (numForecast: number): void => {
		this._router.navigate([`/hourly/${numForecast}`]);
	}

	public goToMainPage = (): void => {
		this._router.navigate([`/main/`]);

	}
	public goToNotFound = (): void => {
		this._router.navigate([`/not-found/`]);
	}
}
