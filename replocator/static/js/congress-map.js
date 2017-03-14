function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 38.88404939999999, lng: -77.0086303
		},
		zoom: 10,
		streetViewControl: false,
		mapTypeControl: false
	});
	var input = document.getElementById('pac-input');
	var autocomplete = new google.maps.places.Autocomplete(input, {
		placeIdOnly: true
	});
	autocomplete.setComponentRestrictions({
		'country': ['us', 'pr', 'vi', 'gu', 'mp']
	});
	autocomplete.bindTo('bounds', map);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	var infowindow = new google.maps.InfoWindow();
	var infowindowContent = document.getElementById('infowindow-content');
	infowindow.setContent(infowindowContent);
	var geocoder = new google.maps.Geocoder;
	var marker = new google.maps.Marker({
		map: map
	});
	marker.addListener('click', function () {
		infowindow.open(map, marker);
	});
	autocomplete.addListener('place_changed', function () {
		infowindow.close();
		var place = autocomplete.getPlace();
		if (!place.place_id) {
			return;
		}
		geocoder.geocode({
			'placeId': place.place_id
		}, function (results, status) {
			if (status !== 'OK') {
				window.alert('Geocoder failed due to: ' + status);
				return;
			}
			map.setZoom(15);
			map.setCenter(results[0].geometry.location);
			// Set the position of the marker using the place ID and location.
			marker.setPlace({
				placeId: place.place_id
				, location: results[0].geometry.location
			});
			// Set hidden fields in form
			document.getElementById('lat').setAttribute('value', results[0].geometry.location.lat());
			document.getElementById('lng').setAttribute('value', results[0].geometry.location.lng());
			document.getElementById('submit-button').removeAttribute('disabled');
			document.getElementById('submit-button').value = "Submit";
			marker.setVisible(true);
			infowindowContent.children['place-name'].textContent = place.name;
			infowindowContent.children['place-address'].textContent = results[0].formatted_address;
		});
	});
}
