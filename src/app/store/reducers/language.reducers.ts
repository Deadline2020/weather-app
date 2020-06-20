import { ILanguageActions, ELanguageActions } from '../actions/language.actions';
import { ILanguageState, initialLanguageState } from '../state/language.state';

export const languageReducer: (state: ILanguageState, action: ILanguageActions) => ILanguageState = (
	state: ILanguageState = initialLanguageState,
	action: ILanguageActions,
): ILanguageState => {
	switch (action.type) {
		case ELanguageActions.SetCurrentLanguage: {
			return { ...state, language: action.payload };
		}
		default: return state;
	}
};
