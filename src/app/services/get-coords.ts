import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subscriber, Subject } from 'rxjs';

import { ICoords } from '../models/coords';
import { selectCoords } from '../store/selectors/coords.selector';
import { IAppState } from '../store/state/app.state';

@Injectable()
export class GetCoordsService implements OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject();
	private curCoords$: Observable<ICoords> = this._store.pipe(select(selectCoords), takeUntil(this.destroySubject$));
	private curCoords: ICoords;

	constructor(
		private _store: Store<IAppState>,
	) {
		this.curCoords$.subscribe((curCoords: ICoords) => {
			this.curCoords = curCoords;
		});
	}

	public getCurLocation = () => {
		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};
		return new Observable((observer: Subscriber<ICoords>) => {
			navigator.geolocation.getCurrentPosition(
				(location: Position) => {
					const latitude: number = location.coords.latitude;
					const longitude: number = location.coords.longitude;
					observer.next({ latitude, longitude });
				},
				() => {
					observer.next(this.curCoords);
				},
				options);
		});
	}
	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
