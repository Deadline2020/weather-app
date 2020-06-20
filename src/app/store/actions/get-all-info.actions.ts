import { Action } from '@ngrx/store';
import { ICoords } from 'src/app/models/coords';

export enum EGetAllInfoActions {
	GetAllInfo = '[GetAllInfo] Get All Info',
}

export interface IGetAllInfoActions extends Action {
	type: string;
	payload: ICoords;
}

export function getAllInfo(payload: ICoords): IGetAllInfoActions {
	return {
		type: EGetAllInfoActions.GetAllInfo,
		payload,
	};
}
