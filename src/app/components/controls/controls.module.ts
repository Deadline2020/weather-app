import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { ControlsComponent } from './controls.component';
import { SearchComponent } from './components/search/search.component';
import { LangDropListComponent } from './components/lang-drop-list/lang-drop-list.component';
import { TempUnitCheckboxComponent } from './components/temp-unit-checkbox/temp-unit-checkbox.component';
import { SpeakerBtnComponent } from './components/speaker-btn/speaker-btn.component';
import { ControlsService } from './services/controls.service';
import { SpeechRecognitionService } from './services/speech-recognition.service';
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
		TranslocoRootModule,
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
