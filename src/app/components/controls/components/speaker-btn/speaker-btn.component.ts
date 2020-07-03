import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-speaker-btn',
  templateUrl: './speaker-btn.component.html',
  styleUrls: ['./speaker-btn.component.scss']
})
export class SpeakerBtnComponent {

	@Output() public clickVoiceSpeaker: EventEmitter<boolean> = new EventEmitter();

  public onClickSpeak(): void {
		this.clickVoiceSpeaker.emit();
	}
}
