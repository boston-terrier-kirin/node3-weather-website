const request = require('request');

const getGeocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1Ijoia29oZWktbWF0c3Vtb3RvIiwiYSI6ImNra2oybW9iOTBkenIycG52MDlpOGVvYWYifQ.xHju_RjwWMV4KqlDJQ0TGQ';

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to location server!', undefined);
		} else if (response.body.features.length === 0) {
			callback('Unable to find location. Try another search.');
		} else {
			const placeName = response.body.features[0].place_name;
			const latitude = response.body.features[0].center[1];
			const longitude = response.body.features[0].center[0];

			callback(undefined, {
				latitude: latitude,
				longitude: longitude,
				location: placeName,
			});
		}
	});
};

module.exports = {
	getGeocode: getGeocode,
};
