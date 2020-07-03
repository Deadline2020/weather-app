export interface IForecastHour {
	temperature: number | string;
	icon: string;
	windSpeed: number | string;
	humidity: number;
	hour?: number;
	time?: number;
}
