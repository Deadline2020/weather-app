import { Action } from '@ngrx/store';

import { IInfoLocation } from 'src/app/models/info-location';

export enum EInfoLocationActions {
	GetInfoLocation = '[InfoLocation] Get Info Location',
	GetInfoLocationSuccess = '[InfoLocation] Get Info Location Success',
}

export interface IInfoLocationActions extends Action {
	type: string;
	payload: IInfoLocation;
}

export function getInfoLocationSuccess(payload: IInfoLocation): IInfoLocationActions {
	return {
		type: EInfoLocationActions.GetInfoLocationSuccess,
		payload,
	};
}
