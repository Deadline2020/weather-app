import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EBgImageActions, IBgImageRequestActions, getBgImageSuccess, IBgImageUrlActions } from '../actions/bg-image.actions';
import { BgImageService } from '../../services/bg-image.service';
import { IBgImage } from 'src/app/models/bg-image';

@Injectable()
export class BgImageEffects {

	@Effect()
	public getBgImage$: Observable<IBgImageUrlActions> = this._actions$.pipe(
		ofType<IBgImageRequestActions>(EBgImageActions.GetBgImageUrl),
		switchMap((data: IBgImageRequestActions) => {
			return this._BgImageService.getBGImg(['winter', 'day']);
		}),
		switchMap((data: IBgImage) => of(getBgImageSuccess(data)))
	);
	constructor(
		private _actions$: Actions,
		private _BgImageService: BgImageService,
	) { }
}
