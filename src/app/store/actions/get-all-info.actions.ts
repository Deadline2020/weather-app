import { Action } from '@ngrx/store';

import { IInfoRequest } from 'src/app/models/info-request';

export enum EGetAllInfoActions {
	GetAllInfo = '[GetAllInfo] Get All Info',
}

export interface IGetAllInfoActions extends Action {
	type: string;
	payload: IInfoRequest;
}

export function getAllInfo(payload: IInfoRequest): IGetAllInfoActions {
	return {
		type: EGetAllInfoActions.GetAllInfo,
		payload,
	};
}
