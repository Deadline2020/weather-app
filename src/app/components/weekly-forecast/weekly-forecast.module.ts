import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { WeeklyForecastComponent } from './weekly-forecast.component';
import { ShortForecastComponent } from './components/short-forecast/short-forecast.component';

@NgModule({
	declarations: [
		WeeklyForecastComponent,
		ShortForecastComponent,
	],
	imports: [
		CommonModule,
		NgxUsefulSwiperModule,
	],
	exports: [
		WeeklyForecastComponent,
	],
})
export class WeeklyForecastModule { }
