import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import { ControlsService } from './services/controls.service';
import { SearchComponent } from './components/search/search.component';

@NgModule({
	declarations: [
		ControlsComponent,
		SearchComponent,
	],
	imports: [
		CommonModule
	],
	providers: [
		ControlsService,
	],
	exports: [
		ControlsComponent,
	],
})
export class ControlsModule { }
