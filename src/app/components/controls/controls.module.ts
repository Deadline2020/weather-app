import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlsComponent } from './controls.component';
import { ControlsService } from './services/controls.service';
import { SearchComponent } from './components/search/search.component';
import { LangDropListComponent } from './components/lang-drop-list/lang-drop-list.component';
import { TempUnitCheckboxComponent } from './components/temp-unit-checkbox/temp-unit-checkbox.component';
import { SpeechRecognitionService } from './services/speech-recognition.service';
import { SpeakerBtnComponent } from './components/speaker-btn/speaker-btn.component';
import { SpeechSynthesisService } from './services/speech-synthesis.service';
import { VoiceService } from './services/voice.service';

@NgModule({
	declarations: [
		ControlsComponent,
		SearchComponent,
		LangDropListComponent,
		TempUnitCheckboxComponent,
		SpeakerBtnComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
	],
	providers: [
		ControlsService,
		SpeechRecognitionService,
		SpeechSynthesisService,
		VoiceService
	],
	exports: [
		ControlsComponent,
	],
})
export class ControlsModule { }
