import { IForecastActions, EForecastActions } from '../actions/forecast.actions';
import { IForecastState, initialForecastState } from '../state/forecast.state';

export const forecastReducer: (state: IForecastState, action: IForecastActions) => IForecastState = (
	state: IForecastState = initialForecastState,
	action: IForecastActions,
): IForecastState => {
	switch (action.type) {
		case EForecastActions.GetDayForecastSuccess: {
			return { ...state, forecast: action.payload };
		}
		default: return state;
	}
};
