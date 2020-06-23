import { IIsInitedActions, EIsInitActions } from '../actions/is-init.actions';
import { IIsInitState, initialIsInitState } from '../state/is-init.state';

export const isInitReducer: (state: IIsInitState, action: IIsInitedActions) => IIsInitState = (
	state: IIsInitState = initialIsInitState,
	action: IIsInitedActions,
): IIsInitState => {
	switch (action.type) {
		case EIsInitActions.appInited: {
			return { ...state, isInit: true };
		}
		default: return state;
	}
};
