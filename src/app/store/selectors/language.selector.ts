import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ILanguageState } from '../state/language.state';

const languageState: (state: IAppState) => ILanguageState = (state: IAppState) => state.language;

export const selectLanguage: MemoizedSelector<IAppState, string> = createSelector(
	languageState,
	(state: ILanguageState) => state.language
);
