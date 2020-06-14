
import { IBgImageState, initialBgImageState } from './bg-image.state';
import { ILanguageState, initialLanguageState } from './lang.state';

export interface IAppState {
  bgImage: IBgImageState;
  language: ILanguageState;
}

export const initialAppState: IAppState = {
  bgImage: initialBgImageState,
  language: initialLanguageState,
};

export const getInitialState: () => IAppState = (): IAppState => {
  return initialAppState;
};
