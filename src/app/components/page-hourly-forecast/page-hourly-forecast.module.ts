import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

import { PageHourlyForecastComponent } from './page-hourly-forecast.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';

@NgModule({
	declarations: [
		PageHourlyForecastComponent,
		HourlyForecastComponent
	],
	imports: [
		CommonModule,
		TranslocoRootModule,
	],
	exports: [
		PageHourlyForecastComponent,
	],
})
export class PageHourlyForecastModule { }
