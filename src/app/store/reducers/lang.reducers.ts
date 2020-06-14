import { ILanguageState, initialLanguageState } from '../state/lang.state';
import { ILanguageActions, ELanguageActions } from '../actions/lang.actions';

export const languageReducer: (state: ILanguageState, action: ILanguageActions) => ILanguageState = (
	state: ILanguageState = initialLanguageState,
	action: ILanguageActions,
): ILanguageState => {
	switch (action.type) {
		case ELanguageActions.SetCurrentLanguage: {
			return { ...state, languageData: { ...state.languageData, lang: action.payload } };
		}
		default: return state;
	}
};
