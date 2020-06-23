import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-lang-drop-list',
	templateUrl: './lang-drop-list.component.html',
	styleUrls: ['./lang-drop-list.component.scss']
})
export class LangDropListComponent implements OnInit {

	@Input() public currentLang: string;
	@Output() public onChangeLang: EventEmitter<string> = new EventEmitter();

	constructor() { }

	public ngOnInit(): void { }

	public onChange(lang: string): void {
		this.onChangeLang.emit(lang);
	}

}
