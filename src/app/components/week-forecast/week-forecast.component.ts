import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

import { WeekForecastService } from './services/week-forecast.service';

@Component({
	selector: 'app-week-forecast',
	templateUrl: './week-forecast.component.html',
	styleUrls: ['./week-forecast.component.scss']
})
export class WeekForecastComponent implements OnInit {
	public config: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		direction: 'vertical',
		// spaceBetween: 25,
		slidesPerView: 3,
		mousewheel: true,
	};

		constructor(
		public weekForecast: WeekForecastService,
	) { }

	public ngOnInit(): void { }

}
