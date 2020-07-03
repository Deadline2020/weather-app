import { IForecastHourActions, EForecastActions } from '../actions/forecast.actions';
import { IForecastHourlyState, initialForecastHourlyState } from '../state/forecast-hourly.state';

export const forecastHourlyReducer: (state: IForecastHourlyState, action: IForecastHourActions) => IForecastHourlyState = (
	state: IForecastHourlyState = initialForecastHourlyState,
	action: IForecastHourActions,
): IForecastHourlyState => {
	switch (action.type) {
		case EForecastActions.GetHourlyForecastSuccess: {
			return { ...state, forecastHourly: action.payload };
		}
		default: return state;
	}
};
