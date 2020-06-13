import { IBgImageState, initialBgImageState } from '../state/bg-image.state';
import { EBgImageActions, IBgImageUrlActions } from '../actions/bg-image.actions';

export const bgImageReducer: (state: IBgImageState, action: IBgImageUrlActions) => IBgImageState = (
	state: IBgImageState = initialBgImageState,
	action: IBgImageUrlActions,
): IBgImageState => {
	switch (action.type) {
		case EBgImageActions.GetBgImageUrlSuccess: {
			return { ...state, bgImageData: action.payload };
		}
		default: return state;
	}
};
