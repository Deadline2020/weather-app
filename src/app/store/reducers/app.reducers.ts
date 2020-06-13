import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { bgImageReducer } from './bg-image.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  bgImage: bgImageReducer,
};
