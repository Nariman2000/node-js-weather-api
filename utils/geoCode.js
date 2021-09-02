const req = require('request');

// With callback
const geoCode = (city, callback) => {
  const mapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    city,
  )}.json?access_token=pk.eyJ1IjoibmFyaW1hbjE1OTAiLCJhIjoiY2tzMHJmeDczMGN4NDJ3cGVwYTJkMXdlOSJ9.hr9kDUFjSITMNrlg97RXhw&limit=1`;

  req({ url: mapBox, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to the web service.', undefined);
    } else if (res.body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = { geoCode };
