import { Action } from '@ngrx/store';

export enum ELoadDataActions {
	LoadDataStart = '[LoadData] Load Data Start',
	LoadDataFinish = '[LoadData] Load Data Finish',
}

export interface ILoadDataActions extends Action {
	type: string;
}

export function loadDataStart(): ILoadDataActions {
	return {
		type: ELoadDataActions.LoadDataStart,
	};
}

export function loadDataFinish(): ILoadDataActions {
	return {
		type: ELoadDataActions.LoadDataFinish,
	};
}
