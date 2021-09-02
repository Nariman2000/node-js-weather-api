const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

// Define paths for express config
const public = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Template Engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(public));

// geoCode and forecast
const { geoCode } = require('./../utils/geoCode');
const { forecast } = require('./../utils/forecast');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather-App',
    subject: 'Weather',
    name: 'Nariman Naghavi',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    subject: 'About Us',
    name: 'Nariman Naghavi',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Some helpful message',
    name: 'Nariman Naghavi',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter your address',
    });
  }

  console.log(req.query);
  // res.send({
  //   forecast: 'Sunny',
  //   location: `${req.query.address}`,

  // });

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }

        console.log(data);

        res.send({
          location,
          time: `${data.time}`,
          temperature: `${data.temperature} °C`,
          weather: `It's ${data.weather}`,
        });
      });
    },
  );
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must to provide your search term',
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.status(404).render('error', {
    title: '404 Page not found !',
    errorMessage: 'Help data not found',
  });
});

app.get('*', (req, res) => {
  res.status(404).render('error', {
    title: '404 Page not found !',
    errorMessage: '404',
    name: 'Nariman Naghavi',
  });
});

app.listen(8000, () => {
  console.log('Server is up on port 8000 ...');
});
