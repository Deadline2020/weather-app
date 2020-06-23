import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { ErrorMsgService } from './services/error-msg.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		public appService: AppService,
		public errorMsg: ErrorMsgService,
	) { }
}
