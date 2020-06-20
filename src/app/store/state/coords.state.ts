import { ICoords } from 'src/app/models/coords';

export interface ICoordsState {
	coords: ICoords;
}

export const initialCoordsState: ICoordsState = {
	coords: {
		latitude: 53.902334,
		longitude: 27.5618791,
	}
};
