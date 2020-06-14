import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyForecastComponent } from './daily-forecast.component';

@NgModule({
	declarations: [
		DailyForecastComponent,
	],
	imports: [
		CommonModule
	],
	providers: [],
	exports: [
		DailyForecastComponent,
	],
})
export class DailyForecastModule { }
