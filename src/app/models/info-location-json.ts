export interface IInfoLocationJson {
	results: [{
		annotations: {
			timezone: {
				offset_sec: number
			},
		},
		components: {
			country: string,
			city?: string,
			town?: string,
			village?: string,
			county?: string,
			suburb?: string,
			hamlet?: string,
		},
	}];
	timestamp: {
		created_unix: number,
	};
}
