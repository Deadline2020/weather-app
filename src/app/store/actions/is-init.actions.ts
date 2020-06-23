import { Action } from '@ngrx/store';

export enum EIsInitActions {
	appInited = '[InitApp] App Init',
}

export interface IIsInitedActions extends Action {
	type: string;
}

export function setIsInitTrue(): IIsInitedActions {
	return {
		type: EIsInitActions.appInited,
	};
}
