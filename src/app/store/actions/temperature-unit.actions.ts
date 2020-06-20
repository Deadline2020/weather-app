import { Action } from '@ngrx/store';

export enum ETemperatureUnitActions {
	SetTemperatureUnit = '[TemperatureUnit] Set Temperature Unit',
}

export interface ITemperatureUnitActions extends Action {
	type: string;
	payload: string;
}

export function setTemperatureUnit(payload: string): ITemperatureUnitActions {
	return {
		type: ETemperatureUnitActions.SetTemperatureUnit,
		payload,
	};
}
