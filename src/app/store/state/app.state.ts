import { IIsLoadedState, initialIsLoadedState } from './is-loaded.state';
import { IUrlBgImgState, initialUrlBgImgState } from './bg-image.state';
import { ILanguageState, initialLanguageState } from './language.state';
import { ITemperatureUnitState, initialTemperatureUnitState } from './temperature-unit.state';
import { ICoordsState, initialCoordsState } from './coords.state';
import { IInfoLocationState, initialInfoLocationState } from './info-location.state';
import { IForecastDayState, initialForecastDayState } from './forecast-day.state';

export interface IAppState {
  isLoaded: IIsLoadedState;
  urlBgImg: IUrlBgImgState;
  language: ILanguageState;
  temperatureUnit: ITemperatureUnitState;
  coords: ICoordsState;
  infoLocation: IInfoLocationState;
  forecastDay: IForecastDayState;
}

export const initialAppState: IAppState = {
  isLoaded: initialIsLoadedState,
  urlBgImg: initialUrlBgImgState,
  language: initialLanguageState,
  temperatureUnit: initialTemperatureUnitState,
  coords: initialCoordsState,
  infoLocation: initialInfoLocationState,
  forecastDay: initialForecastDayState,
};

export const getInitialState: () => IAppState = (): IAppState => {
  return initialAppState;
};
