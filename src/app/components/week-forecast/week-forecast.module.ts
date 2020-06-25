import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekForecastComponent } from './week-forecast.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ShortForecastComponent } from './components/short-forecast/short-forecast.component';
import { WeekForecastService } from './services/week-forecast.service';

@NgModule({
	declarations: [
		WeekForecastComponent,
		ShortForecastComponent,
	],
	imports: [
		CommonModule,
		NgxUsefulSwiperModule,
	],
	providers: [
		WeekForecastService,
	],
	exports: [
		WeekForecastComponent,
	],
})
export class WeekForecastModule { }
