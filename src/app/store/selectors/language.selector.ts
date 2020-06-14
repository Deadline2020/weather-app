import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ILanguageState } from '../state/lang.state';
import { ILanguageData } from 'src/app/models/language-data';

const languageState: (state: IAppState) => ILanguageState = (state: IAppState) => state.language;

export const selectLanguage: MemoizedSelector<IAppState, ILanguageData> = createSelector(
  languageState,
  (state: ILanguageState) => state.languageData
);
