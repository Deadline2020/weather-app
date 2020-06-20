import { Action } from '@ngrx/store';

export enum ELanguageActions {
	SetCurrentLanguage = '[Language] Set Current Language',
}

export interface ILanguageActions extends Action {
	type: string;
	payload: string;
}

export function setCurrentLanguage(payload: string): ILanguageActions {
	return {
		type: ELanguageActions.SetCurrentLanguage,
		payload,
	};
}
