export interface IForecastJson {
	currently: {
		summary: string;
		icon: string;
		temperature: number;
		apparentTemperature: number;
		humidity: number;
		windSpeed: number;
	};
	hourly: {
		summary: string;
	};
}
