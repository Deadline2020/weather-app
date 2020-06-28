import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IInfoLocationState } from '../state/info-location.state';
import { IInfoLocation } from 'src/app/models/info-location';

const infoLocationState: (state: IAppState) => IInfoLocationState = (state: IAppState) => state.infoLocation;

export const selectInfoLocation: MemoizedSelector<IAppState, IInfoLocation> = createSelector(
	infoLocationState,
	(state: IInfoLocationState) => state.infoLocation
);
