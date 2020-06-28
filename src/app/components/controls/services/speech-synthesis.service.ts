import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class SpeechSynthesisService implements OnDestroy {

	private voiceMessage: SpeechSynthesisUtterance;
	private voiceArr: SpeechSynthesisVoice[];

	constructor() {
		this.initSpeechSynthesizer();
	}

	private initSpeechSynthesizer = (): void => {
		this.voiceMessage = new SpeechSynthesisUtterance();
		window.speechSynthesis.addEventListener('voiceschanged', this.onChangeArrVoices);
	}

	private onChangeArrVoices = (): void => {
		this.voiceArr = window.speechSynthesis.getVoices();
	}

	public startSpeaker = (msg: string, langLocal: string): void => {
		this.setVoiceLanguage(langLocal);
		this.voiceMessage.text = msg;
		speechSynthesis.speak(this.voiceMessage);
	}

	public setVoiceLanguage = (langLocale: string): void => {
		this.voiceMessage.voice = this.voiceArr
			.filter((voice: SpeechSynthesisVoice) => voice.lang === langLocale).pop();
	}

	public ngOnDestroy(): void {
		window.speechSynthesis.removeEventListener('voiceschanged', this.onChangeArrVoices);
	}
}
