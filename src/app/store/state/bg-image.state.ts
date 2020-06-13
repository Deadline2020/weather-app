import { IBgImage } from '../../models/bg-image';

export interface IBgImageState {
  bgImageData: IBgImage;

}

export const initialBgImageState: IBgImageState = {
  bgImageData: null,
};
