import { IInfoLocation } from 'src/app/models/info-location';

export interface IInfoLocationState {
	infoLocation: IInfoLocation;
}

export const initialInfoLocationState: IInfoLocationState = {
	infoLocation: null,
};
