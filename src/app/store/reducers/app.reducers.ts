import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { bgImageReducer } from './bg-image.reducers';
import { languageReducer } from './language.reducers';
import { loadDataReducer } from './load-data.reducers';
import { temperatureUnitReducer } from './temperature-unit.reducers';
import { coordsReducer } from './coords.reducers';
import { infoLocationReducer } from './info-location.reducers';
import { forecastReducer } from './forecast.reducers';
import { isInitReducer } from './is-init.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  isLoaded: loadDataReducer,
  urlBgImg: bgImageReducer,
  language: languageReducer,
  temperatureUnit: temperatureUnitReducer,
  coords: coordsReducer,
  infoLocation: infoLocationReducer,
  forecast: forecastReducer,
  isInit: isInitReducer,
};
