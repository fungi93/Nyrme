import {fetch} from 'wix-fetch';

$w.onReady(() => {
  $w('#myButton').onClick(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const response = await fetch(`https://yourbackend.example.com/find_restaurants?lat=${lat}&lng=${lng}`);
        const restaurants = await response.json();
        // Display the restaurants
      }, (error) => {
        console.error('Error occurred. Error code: ' + error.code);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  });
});
