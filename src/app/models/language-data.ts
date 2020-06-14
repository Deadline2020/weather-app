import { IDictString } from './dict-string';
import { IDictArray } from './dict-array';

export interface ILanguageData {
	lang: string;
	dict: { [key: string]: IDictString | IDictArray };
}
