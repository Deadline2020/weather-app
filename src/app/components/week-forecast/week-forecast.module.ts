import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekForecastComponent } from './week-forecast.component';

@NgModule({
	declarations: [
		WeekForecastComponent,
	],
	imports: [
		CommonModule
	],
	providers: [],
	exports: [
		WeekForecastComponent,
	],
})
export class WeekForecastModule { }
