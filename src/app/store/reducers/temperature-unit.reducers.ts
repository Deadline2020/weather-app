import { ITemperatureUnitActions, ETemperatureUnitActions } from '../actions/temperature-unit.actions';
import { ITemperatureUnitState, initialTemperatureUnitState } from '../state/temperature-unit.state';

export const temperatureUnitReducer: (state: ITemperatureUnitState, action: ITemperatureUnitActions) => ITemperatureUnitState = (
	state: ITemperatureUnitState = initialTemperatureUnitState,
	action: ITemperatureUnitActions,
): ITemperatureUnitState => {
	switch (action.type) {
		case ETemperatureUnitActions.SetTemperatureUnit: {
			return { ...state, temperatureUnit: action.payload };
		}
		default: return state;
	}
};
