import { Action } from '@ngrx/store';

export enum EBgImageActions {
	GetBgImageSuccess = '[BgImage] Get Bg Image Url Success',
}

export interface IBgImageActions extends Action {
	type: string;
	payload: string;
}

export function getBgImageSuccess(payload: string): IBgImageActions {
	return {
		type: EBgImageActions.GetBgImageSuccess,
		payload,
	};
}
