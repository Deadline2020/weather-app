import { Action } from '@ngrx/store';

import { IBgImage } from '../../models/bg-image';

export enum EBgImageActions {
	GetBgImageUrl = '[BgImage] Get Bg Image Url',
	GetBgImageUrlSuccess = '[BgImage] Get Bg Image Url Success',
}

export interface IBgImageUrlActions extends Action {
	type: string;
	payload: IBgImage;
}

export interface IBgImageRequestActions extends Action {
	type: string;
	payload: string[];
}

export function getBgImage(payload: string[]): IBgImageRequestActions {
	return {
		type: EBgImageActions.GetBgImageUrl,
		payload,
	};
}

export function getBgImageSuccess(payload: IBgImage): IBgImageUrlActions {
	return {
		type: EBgImageActions.GetBgImageUrlSuccess,
		payload,
	};
}

// export type bgImageActions = typeof getBgImage | typeof getBgImageSuccess;
