import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

	constructor(
		public appService: AppService,
	) { }
}
