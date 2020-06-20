import { IBgImageActions, EBgImageActions } from '../actions/bg-image.actions';
import { IUrlBgImgState, initialUrlBgImgState } from '../state/bg-image.state';

export const bgImageReducer: (state: IUrlBgImgState, action: IBgImageActions) => IUrlBgImgState = (
	state: IUrlBgImgState = initialUrlBgImgState,
	action: IBgImageActions,
): IUrlBgImgState => {
	switch (action.type) {
		case EBgImageActions.GetBgImageSuccess: {
			return { ...state, urlBgImg: action.payload };
		}
		default: return state;
	}
};
