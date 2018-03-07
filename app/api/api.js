var api = {
	//https://openweathermap.org/current#geo
	getWeatherInfo(lat, lon){
		const key = '778f2531a178c8c674fa52885f620668';
		const tempUnit = '&units=imperial';
		const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + tempUnit + '&appid=' + key;
		console.log(url + '\n');
		return fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {
				return responseJson;
			})
			.catch((error) => {
		      console.error(error);
		    });
	},
	//https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding
	getLocationInfo(lat,lon){
		const type = '&result_type=locality';
		const key = 'AIzaSyC4pe0mDuBUvE3nyIBnXr0XRhUg-YKKluw';
		const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + type + '&key=' + key;
		// console.log(url);
		return fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {
				return responseJson.results[0].address_components;
			})
			.catch((error) => {
		      console.error(error);
		    });
	}
};

module.exports = api;