import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapService } from './services/map.service';

@NgModule({
	declarations: [
		MapComponent,
	],
	imports: [
		CommonModule,
		NgxMapboxGLModule.withConfig({
			accessToken: 'pk.eyJ1IjoiZGVhZGxpbmUyMDIwIiwiYSI6ImNrM296YmVibTAzcXEzZHRqbnhtY2R1eWcifQ.kRGYg-w_NsLMx4ONws3Uzg',
		})
	],
	providers: [
		MapService,
	],
	exports: [
		MapComponent,
	],
})
export class MapModule { }
