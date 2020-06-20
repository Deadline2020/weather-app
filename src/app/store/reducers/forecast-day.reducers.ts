import { IForecastDayActions, EForecastActions } from '../actions/forecast.actions';
import { IForecastDayState, initialForecastDayState } from '../state/forecast-day.state';

export const forecastDayReducer: (state: IForecastDayState, action: IForecastDayActions) => IForecastDayState = (
	state: IForecastDayState = initialForecastDayState,
	action: IForecastDayActions,
): IForecastDayState => {
	switch (action.type) {
		case EForecastActions.GetDayForecastSuccess: {
			return { ...state, forecastDay: action.payload };
		}
		default: return state;
	}
};
