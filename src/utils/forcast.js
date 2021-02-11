const request = require('request');

const getForcast = (latitude, longitude, location, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=6350db67d934ff3154b9b727f146c654&query=' +
		latitude +
		',' +
		longitude;

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to location server!', undefined);
		} else {
			if (response.body.success === false) {
				callback(response.body.error.info, undefined);
			} else {
				callback(undefined, {
					location: location,
					temperature: response.body.current.temperature,
					feelslike: response.body.current.feelslike,
					desc: response.body.current.weather_descriptions,
				});
			}
		}
	});
};

module.exports = {
	getForcast: getForcast,
};
