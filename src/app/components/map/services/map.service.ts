import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ICoords } from 'src/app/models/coords';
import { selectCoords } from 'src/app/store/selectors/coords.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Injectable()
export class MapService {

  public currentCoords$: Observable<ICoords> = this._store.pipe(select(selectCoords));
  constructor(private _store: Store<IAppState>, ) { }
}
