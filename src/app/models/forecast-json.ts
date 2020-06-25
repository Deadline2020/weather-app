export interface IForecastJson {
	currently: {
		summary: string;
		icon: string;
		temperature: number;
		apparentTemperature: number;
		humidity: number;
		windSpeed: number;
	};
	daily: {
		data: [
			{
				summary: string;
				icon: string;
				temperatureHigh: number;
				temperatureLow: number;
			}
		];
	};
}
