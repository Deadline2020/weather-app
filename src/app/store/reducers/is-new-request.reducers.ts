import { IIsNewRequestActions, EIsNewRequestActions } from '../actions/is-new-request.actions';
import { IIsNewRequestState, initialIsNewRequestState } from '../state/is-new-request.state';

export const isNewRequestReducer: (state: IIsNewRequestState, action: IIsNewRequestActions) => IIsNewRequestState = (
	state: IIsNewRequestState = initialIsNewRequestState,
	action: IIsNewRequestActions,
): IIsNewRequestState => {
	switch (action.type) {
		case EIsNewRequestActions.NeedNewRequest: {
			return { ...state, isNewRequest: true };
		}
		case EIsNewRequestActions.RequestSuccess: {
			return { ...state, isNewRequest: false };
		}
		default: return state;
	}
};
