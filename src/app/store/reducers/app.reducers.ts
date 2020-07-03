import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { loadDataReducer } from './load-data.reducers';
import { bgImageReducer } from './bg-image.reducers';
import { languageReducer } from './language.reducers';
import { temperatureUnitReducer } from './temperature-unit.reducers';
import { coordsReducer } from './coords.reducers';
import { infoLocationReducer } from './info-location.reducers';
import { forecastReducer } from './forecast.reducers';
import { isInitReducer } from './is-init.reducers';
import { forecastHourlyReducer } from './forecast-hourly.reducers';
import { isNewRequestReducer } from './is-new-request.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
	isInit: isInitReducer,
	isLoaded: loadDataReducer,
	isNewRequest: isNewRequestReducer,
	urlBgImg: bgImageReducer,
	language: languageReducer,
	temperatureUnit: temperatureUnitReducer,
	coords: coordsReducer,
	infoLocation: infoLocationReducer,
	forecast: forecastReducer,
	forecastHourly: forecastHourlyReducer,
};
