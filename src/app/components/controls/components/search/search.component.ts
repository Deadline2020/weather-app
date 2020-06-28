import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	@Input() public inputSearchValue: string;
	@Input() public searchPlaceholder: string;
	@Input() public searchBtn: string;
	@Input() public isLoaded: boolean;
	@Input() public isRecordOn: boolean;
	@Output() public clickSearch: EventEmitter<string> = new EventEmitter();
	@Output() public clickVoiceSearch: EventEmitter<boolean> = new EventEmitter();

	constructor() { }

	public ngOnInit(): void { }

	public onClickSearch(): void {
		this.clickSearch.emit(this.inputSearchValue);
	}
	public onClickVoiceSearch(): void {
		this.clickVoiceSearch.emit();
	}

}
