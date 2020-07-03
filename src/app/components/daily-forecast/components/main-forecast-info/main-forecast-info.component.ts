import { Component, Input, } from '@angular/core';

@Component({
	selector: 'app-main-forecast-info',
	templateUrl: './main-forecast-info.component.html',
	styleUrls: ['./main-forecast-info.component.scss']
})
export class MainInfoComponent {
	@Input() public currentTemp: string;
	@Input() public iconPath: string;
	@Input() public summary: string;
	@Input() public feelsLike: string;
	@Input() public wind: string;
	@Input() public humidity: string;
}
