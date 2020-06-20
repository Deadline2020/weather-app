import { ILoadDataActions, ELoadDataActions } from '../actions/isLoad.actions';
import { IIsLoadedState, initialIsLoadedState } from '../state/is-loaded.state';

export const loadDataReducer: (state: IIsLoadedState, action: ILoadDataActions) => IIsLoadedState = (
	state: IIsLoadedState = initialIsLoadedState,
	action: ILoadDataActions,
): IIsLoadedState => {
	switch (action.type) {
		case ELoadDataActions.LoadDataStart: {
			return { ...state, isLoaded: false };
		}
		case ELoadDataActions.LoadDataFinish: {
			return { ...state, isLoaded: true };
		}
		default: return state;
	}
};
