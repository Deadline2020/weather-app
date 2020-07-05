import { Injectable } from '@angular/core';
import { TranslocoLoader, Translation, HashMap } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
	constructor(private http: HttpClient) { }

	public getTranslation(lang: string): Observable<HashMap<any>> {
		return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
	}
}
