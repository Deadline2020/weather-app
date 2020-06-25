import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-short-forecast',
	templateUrl: './short-forecast.component.html',
	styleUrls: ['./short-forecast.component.scss']
})
export class ShortForecastComponent implements OnInit {

	@Input() public weekForecast: any;

	constructor() {}

	public ngOnInit(): void { }

}
