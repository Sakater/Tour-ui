export const decodeValhallaShape = (valhallaShape: string) => {
	let index = 0;
	let lat = 0;
	let lng = 0;
	const coordinates = [];
	let shift = 0;
	let result = 0;
	let byte = null;
	let latitude_change = 0;
	let longitude_change = 0;
	const factor = 10 ** 6;

	// Coordinates have variable length when encoded, so just keep
	// track of whether we've hit the end of the string. In each
	// loop iteration, a single coordinate is decoded.
	while (index < valhallaShape.length) {
		// Reset shift, result, and byte
		byte = null;
		shift = 0;
		result = 0;

		do {
			byte = valhallaShape.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

		shift = result = 0;

		do {
			byte = valhallaShape.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

		lat += latitude_change;
		lng += longitude_change;

		coordinates.push([lat / factor, lng / factor]);
	}

	return coordinates;
};
