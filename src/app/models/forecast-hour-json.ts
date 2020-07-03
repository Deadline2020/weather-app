export interface IForecastHourJson {
	hourly: {
		data: [{
			time: number;
			temperature: number;
			icon: string;
			windSpeed: number;
			humidity: number;
		}]
	};
	offset: number;
}
