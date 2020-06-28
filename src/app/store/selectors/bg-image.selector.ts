import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUrlBgImgState } from '../state/bg-image.state';

const bgImageState: (state: IAppState) => IUrlBgImgState = (state: IAppState) => state.urlBgImg;

export const selectBgImage: MemoizedSelector<IAppState, string> = createSelector(
	bgImageState,
	(state: IUrlBgImgState) => state.urlBgImg
);
