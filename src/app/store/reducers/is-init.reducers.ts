import { IIsInitActions, EIsInitActions } from '../actions/is-init.actions';
import { IIsInitState, initialIsInitState } from '../state/is-init.state';

export const isInitReducer: (state: IIsInitState, action: IIsInitActions) => IIsInitState = (
	state: IIsInitState = initialIsInitState,
	action: IIsInitActions,
): IIsInitState => {
	switch (action.type) {
		case EIsInitActions.appInit: {
			return { ...state, isInit: true };
		}
		default: return state;
	}
};
