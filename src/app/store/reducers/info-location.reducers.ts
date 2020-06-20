import { IInfoLocationActions, EInfoLocationActions } from '../actions/info-location.actions';
import { IInfoLocationState, initialInfoLocationState } from '../state/info-location.state';

export const infoLocationReducer: (state: IInfoLocationState, action: IInfoLocationActions) => IInfoLocationState = (
	state: IInfoLocationState = initialInfoLocationState,
	action: IInfoLocationActions,
): IInfoLocationState => {
	switch (action.type) {
		case EInfoLocationActions.GetInfoLocationSuccess: {
			return { ...state, infoLocation: action.payload };
		}
		default: return state;
	}
};
