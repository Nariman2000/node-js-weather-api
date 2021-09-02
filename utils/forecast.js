const req = require('request');

const forecast = (latitude, longitude, callback) => {
  const foreCast = `http://api.weatherstack.com/current?access_key=9581c36ed950876f541046cee8c97e04&query=${latitude},${longitude}`;

  req({ url: foreCast, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect servise', undefined);
    } else if (res.body.err) {
      callback('Unable to finde location', undefined);
    } else {
      callback(undefined, {
        location: res.body.location,
        weather: res.body.current.weather_descriptions[0],
        temperature: res.body.current.temperature,
        time: res.body.location.localtime.slice(-5),
      });
    }
  });
};

module.exports = { forecast };
