import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMsgService {

	public errorMessageText: string = null;

	private beepError = (): void => {
		new Audio('assets/media/error.mp3').play();
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
