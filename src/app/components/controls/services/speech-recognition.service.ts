import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class SpeechRecognitionService {

	public recognition: SpeechRecognition;

	public recordOn$ = (): Observable<string> => {
		return new Observable((observer: Subscriber<string>) => {
			window.SpeechRecognition = window['webkitSpeechRecognition'] || window['SpeechRecognition'];
			this.recognition = new window.SpeechRecognition();
			this.recognition.onresult = (event: SpeechRecognitionEvent) => {
				observer.next(event.results[0][0].transcript);
			};
			this.recognition.onerror = ((error: Event) => {
				observer.error(error);
			});
			this.recognition.onend = () => {
				observer.complete();
			};
			this.recognition.start();
		});
	}
}
