import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

	constructor() { }

	public getRandomNum(num: number): number {
		return Math.floor(Math.random() * num);
	}
}
