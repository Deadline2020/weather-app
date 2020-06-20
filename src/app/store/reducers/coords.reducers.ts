import { ICoordsActions, ECoordsActions } from '../actions/coords.actions';
import { ICoordsState, initialCoordsState } from '../state/coords.state';

export const coordsReducer: (state: ICoordsState, action: ICoordsActions) => ICoordsState = (
	state: ICoordsState = initialCoordsState,
	action: ICoordsActions,
): ICoordsState => {
	switch (action.type) {
		case ECoordsActions.GetCoordsSuccess: {
			return { ...state, coords: action.payload };
		}
		default: return state;
	}
};
