import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyForecastComponent } from './daily-forecast.component';
import { DailyForecastService } from './services/daily-forecast.service';
import { MainInfoComponent } from './components/main-info/main-info/main-info.component';

@NgModule({
	declarations: [
		DailyForecastComponent,
		MainInfoComponent,
	],
	imports: [
		CommonModule
	],
	providers: [
		DailyForecastService,
	],
	exports: [
		DailyForecastComponent,
	],
})
export class DailyForecastModule { }
