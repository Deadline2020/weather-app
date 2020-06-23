import { Action } from '@ngrx/store';
import { ICoords } from 'src/app/models/coords';

export enum ECoordsActions {
	GetCurrentCoords = '[Coords] Get Current Coords',
	GetCityCoords = '[Coords] Get City Coords',
	GetCityCoordsMistake = '[Coords] Get City Coords Mistake',
	GetCoordsSuccess = '[Coords] Get Coords Success',
}

export interface ICurrentCoordsActions extends Action {
	type: string;
}

export interface ICityCoordsActions extends Action {
	type: string;
	payload?: string;
}

export interface ICoordsActions extends Action {
	type: string;
	payload: ICoords;
}

export function getCurrentCoords(): ICurrentCoordsActions {
	return {
		type: ECoordsActions.GetCurrentCoords,
	};
}

export function getCityCoords(payload: string): ICityCoordsActions {
	return {
		type: ECoordsActions.GetCityCoords,
		payload,
	};
}

export function getCityCoordsMistake(): ICityCoordsActions {
	return {
		type: ECoordsActions.GetCityCoordsMistake,
	};
}

export function getCoordsSuccess(payload: ICoords): ICoordsActions {
	return {
		type: ECoordsActions.GetCoordsSuccess,
		payload,
	};
}
