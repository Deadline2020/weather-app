import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IBgImageState } from '../state/bg-image.state';
import { IAppState } from '../state/app.state';
import { IBgImage } from 'src/app/models/bg-image';

const bgImageState: (state: IAppState) => IBgImageState = (state: IAppState) => state.bgImage;

export const selectBgImage: MemoizedSelector<IAppState, IBgImage> = createSelector(
  bgImageState,
  (state: IBgImageState) => state.bgImageData
);
