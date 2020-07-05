import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from 'src/app/transloco-root.module';

import { DailyForecastComponent } from './daily-forecast.component';
import { MainInfoComponent } from './components/main-forecast-info/main-forecast-info.component';
import { DailyForecastService } from './services/daily-forecast.service';

@NgModule({
	declarations: [
		DailyForecastComponent,
		MainInfoComponent,
	],
	imports: [
		CommonModule,
		TranslocoRootModule,
	],
	providers: [
		DailyForecastService,
	],
	exports: [
		DailyForecastComponent,
	],
})
export class DailyForecastModule { }
