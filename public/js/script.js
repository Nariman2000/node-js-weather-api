console.log('Hello Nariman');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-one');
const msgTwo = document.querySelector('#message-two');
const msgThree = document.querySelector('#message-three');

fetch('https://puzzle.mead.io/puzzle').then(res => {
  res.json().then(data => {
    console.log(data);
  });
});

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  // Value of input
  const location = search.value;

  // Loader
  msgOne.textContent = 'Loading ...';
  msgTwo.textContent = '';
  msgThree.textContent = '';

  // Fetch the api for weather
  fetch(`http://localhost:8000/weather?address=${location}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = `Location: ${data.location}`;
        msgTwo.textContent = `${data.weather} temperature is ${data.temperature}`;
        msgThree.textContent = `Time in ${location}: ${data.time}`;
      }
    });
  });
});
