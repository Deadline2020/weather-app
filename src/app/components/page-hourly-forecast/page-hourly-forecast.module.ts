import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHourlyForecastComponent } from './page-hourly-forecast.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';

@NgModule({
	declarations: [
		PageHourlyForecastComponent,
		HourlyForecastComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		PageHourlyForecastComponent,
	],
})
export class PageHourlyForecastModule { }
