import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { bgImageReducer } from './bg-image.reducers';
import { languageReducer } from './lang.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  bgImage: bgImageReducer,
  language: languageReducer,
};
