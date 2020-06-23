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
	@Output() public onClickSearch: EventEmitter<string> = new EventEmitter();

	constructor() { }

	public ngOnInit(): void { }

	public onClick(): void {
		this.onClickSearch.emit(this.inputSearchValue);
	}

}
