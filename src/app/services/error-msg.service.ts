import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMsgService {

	public errorMessageText: string = null;

	constructor() { }

	private beepError = (): void => {
		const beep: HTMLAudioElement = new Audio('assets/media/error.mp3');
		beep.play();
	}

	public onErrorMessage = (value: string): void => {
		const DELAY: number = 1500;
		this.errorMessageText = value;
		this.beepError();
		setTimeout(() => {
			this.errorMessageText = null;
		}, DELAY);
	}
}
