const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Kirin boston terrier',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Kirin boston terrier',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'What can I do for you?',
		name: 'Kirin boston terrier',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'Adress must be provided!' });
	}
	geocode.getGeocode(req.query.address, (error, geocodeData) => {
		if (error) {
			return res.send(error);
		}

		forcast.getForcast(
			geocodeData.latitude,
			geocodeData.longitude,
			geocodeData.location,

			(error, forcastData) => {
				if (error) {
					return res.send(error);
				}
				return res.send(forcastData);
			}
		);
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({ error: 'You must provide a serch term.' });
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('notfound', {
		title: 'Help',
		message: 'Help article not found.',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		message: 'Page not found.',
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
