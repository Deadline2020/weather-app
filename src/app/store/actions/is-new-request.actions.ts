import { Action } from '@ngrx/store';

export enum EIsNewRequestActions {
	NeedNewRequest = '[NewRequest] Need New Request',
	RequestSuccess = '[NewRequest] Request Success',
}

export interface IIsNewRequestActions extends Action {
	type: string;
}

export function setNeedNewRequest(): IIsNewRequestActions {
	return {
		type: EIsNewRequestActions.NeedNewRequest,
	};
}

export function setRequestSuccess(): IIsNewRequestActions {
	return {
		type: EIsNewRequestActions.RequestSuccess,
	};
}
