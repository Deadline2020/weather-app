import { IForecastShortActions, EForecastActions } from '../actions/forecast.actions';
import { IForecastState, initialForecastState } from '../state/forecast.state';

export const forecastReducer: (state: IForecastState, action: IForecastShortActions) => IForecastState = (
	state: IForecastState = initialForecastState,
	action: IForecastShortActions,
): IForecastState => {
	switch (action.type) {
		case EForecastActions.GetDayForecastSuccess: {
			return { ...state, forecast: action.payload };
		}
		default: return state;
	}
};
