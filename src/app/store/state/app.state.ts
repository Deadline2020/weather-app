
import { IBgImageState, initialBgImageState } from './bg-image.state';

export interface IAppState {
  bgImage: IBgImageState;
}

export const initialAppState: IAppState = {
  bgImage: initialBgImageState,
};

export const getInitialState: () => IAppState = (): IAppState => {
  return initialAppState;
};
