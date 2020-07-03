import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

import { FutureForecastService } from 'src/app/services/future-forecast.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
	selector: 'app-weekly-forecast',
	templateUrl: './weekly-forecast.component.html',
	styleUrls: ['./weekly-forecast.component.scss']
})
export class WeeklyForecastComponent {

	public config_vert: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		direction: 'vertical',
		slidesPerView: 3,
		mousewheel: true,
	};

	public config_hor: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 2,
		mousewheel: true,
	};

	constructor(
		public futureForecastServices: FutureForecastService,
		public routerServices: RouterService,
	) { }
}
