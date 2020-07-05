import { IIsLoadedState, initialIsLoadedState } from './is-loaded.state';
import { IUrlBgImgState, initialUrlBgImgState } from './bg-image.state';
import { ITemperatureUnitState, initialTemperatureUnitState } from './temperature-unit.state';
import { ICoordsState, initialCoordsState } from './coords.state';
import { IInfoLocationState, initialInfoLocationState } from './info-location.state';
import { IForecastState, initialForecastState } from './forecast.state';
import { IIsInitState, initialIsInitState } from './is-init.state';
import { initialForecastHourlyState, IForecastHourlyState } from './forecast-hourly.state';
import { IIsNewRequestState, initialIsNewRequestState } from './is-new-request.state';

export interface IAppState {
	isInit: IIsInitState;
	isLoaded: IIsLoadedState;
	isNewRequest: IIsNewRequestState;
	urlBgImg: IUrlBgImgState;
	temperatureUnit: ITemperatureUnitState;
	coords: ICoordsState;
	infoLocation: IInfoLocationState;
	forecast: IForecastState;
	forecastHourly: IForecastHourlyState;
}

export const initialAppState: IAppState = {
	isInit: initialIsInitState,
	isLoaded: initialIsLoadedState,
	isNewRequest: initialIsNewRequestState,
	urlBgImg: initialUrlBgImgState,
	temperatureUnit: initialTemperatureUnitState,
	coords: initialCoordsState,
	infoLocation: initialInfoLocationState,
	forecast: initialForecastState,
	forecastHourly: initialForecastHourlyState,
};

export const getInitialState: () => IAppState = (): IAppState => {
	return initialAppState;
};
