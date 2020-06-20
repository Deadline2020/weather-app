import { Action } from '@ngrx/store';
import { ICoords } from 'src/app/models/coords';

export enum ECoordsActions {
	GetCoords = '[Coords] Get Coords',
	GetCoordsSuccess = '[Coords] Get Coords Success',
}

export interface ICoordsActions extends Action {
	type: string;
	payload?: ICoords;
}

export function getCoords(): ICoordsActions {
	return {
		type: ECoordsActions.GetCoords,
	};
}

export function getCoordsSuccess(payload: ICoords): ICoordsActions {
	return {
		type: ECoordsActions.GetCoordsSuccess,
		payload,
	};
}
