import { Component } from '@angular/core';

import { ControlsService } from './services/controls.service';

@Component({
	selector: 'app-controls',
	templateUrl: './controls.component.html',
	styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {

	constructor(
		public controlsService: ControlsService,
	) { }
}
