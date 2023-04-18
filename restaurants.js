function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showRestaurants, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function errorCallback(error) {
  alert("Error occurred. Error code: " + error.code);
}

async function showRestaurants(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const userLocation = new google.maps.LatLng(lat, lng);

  const map = new google.maps.Map(document.createElement('div')); // create a hidden map
  const service = new google.maps.places.PlacesService(map);

  const request = {
    location: userLocation,
    radius: 5000, // 5 km in meters
    type: ['restaurant'],
  };

  service.nearbySearch(request, (results, status, pagination) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const delay = 500; // 500 ms delay between requests
      results.forEach((restaurant, index) => {
        setTimeout(() => {
          fetchRestaurantDetails(restaurant.place_id);
        }, index * delay);
      });
      if (pagination.hasNextPage) {
        pagination.nextPage();
      }
    } else {
      alert("Error occurred: " + status);
    }
  });
}

function fetchRestaurantDetails(placeId) {
  const map = new google.maps.Map(document.createElement('div'));
  const service = new google.maps.places.PlacesService(map);

  service.getDetails({ placeId }, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayRestaurant(place);
    } else {
      alert("Error occurred: " + status);
    }
  });
}

function displayRestaurant(restaurant) {
  const listContainer = document.getElementById('restaurants-list');
  const listItem = document.createElement('li');
  listItem.innerHTML = `<a href="${restaurant.website || '#'}" target="_blank">${restaurant.name}</a>
                        <p>Rating: ${restaurant.rating}</p>
                        <p>Website: <a href="${restaurant.website || '#'}" target="_blank">${restaurant.website || 'N/A'}</a></p>`;
  listContainer.appendChild(listItem);
}
