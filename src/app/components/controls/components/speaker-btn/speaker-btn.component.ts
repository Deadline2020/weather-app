import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-speaker-btn',
  templateUrl: './speaker-btn.component.html',
  styleUrls: ['./speaker-btn.component.scss']
})
export class SpeakerBtnComponent implements OnInit {

	@Output() public clickVoiceSpeaker: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void { }

  public onClickSpeak(): void {
		this.clickVoiceSpeaker.emit();
	}

}
