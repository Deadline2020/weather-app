import { Action } from '@ngrx/store';

export enum EIsInitActions {
	AppInit = '[InitApp] App Init',
}

export interface IIsInitActions extends Action {
	type: string;
}

export function setIsInitTrue(): IIsInitActions {
	return {
		type: EIsInitActions.AppInit,
	};
}
