import { Component } from '@angular/core';
import { MapService } from './services/map.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent {

	constructor(
		public mapServices: MapService,
	) { }
}
