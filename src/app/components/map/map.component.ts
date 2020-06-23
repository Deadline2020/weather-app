import { Component, OnInit } from '@angular/core';
import { MapService } from './services/map.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	constructor(public mapServices: MapService, ) { }

	// private getMap = (long: number, lat: number) => {
	// 	window.mapboxgl.accessToken = 'pk.eyJ1IjoiZGVhZGxpbmUyMDIwIiwiYSI6ImNrM296YmVibTAzcXEzZHRqbnhtY2R1eWcifQ.kRGYg-w_NsLMx4ONws3Uzg';
	// 	const map = new window.mapboxgl.Map({
	// 		container: 'map',
	// 		style: 'mapbox://styles/mapbox/outdoors-v11',
	// 		center: [long, lat],
	// 		zoom: 10,
	// 	});
	// 	return map;
	// };

	public ngOnInit(): void { }
}
