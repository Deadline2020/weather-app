import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import { ControlsService } from './services/controls.service';
import { SearchComponent } from './components/search/search.component';
import { LangDropListComponent } from './components/lang-drop-list/lang-drop-list.component';
import { TempUnitCheckboxComponent } from './components/temp-unit-checkbox/temp-unit-checkbox.component';

@NgModule({
	declarations: [
		ControlsComponent,
		SearchComponent,
		LangDropListComponent,
		TempUnitCheckboxComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
	],
	providers: [
		ControlsService,
	],
	exports: [
		ControlsComponent,
	],
})
export class ControlsModule { }
