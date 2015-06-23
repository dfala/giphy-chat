angular.module('giphyApp')

.factory('giphyService', function ($http, $firebaseArray) {
	var service = {};
	var gifRef = new Firebase('https://gifschat.firebaseio.com/gifs');

	service.getGifs = function (searchQuery) {
		var url = "https://api.giphy.com/v1/gifs/search?q=";
		var apiKey = "&api_key=dc6zaTOxFJmzC";

		url += encodeURI(searchQuery) + apiKey;

		$http.get(url)
			.success(function (response) {
				var randomNum = Math.round(Math.random() * (response.data.length - 1));
				var gif = response.data[randomNum];

				saveMessage(gif);
			})
			.error(function (err) {
				throw new Error(err);
			});
	}


	// save new gif to firebase
	var saveMessage = function (gifData) {
		// gifRef.push(gifData);
		gifData.timestamp = Firebase.ServerValue.TIMESTAMP;
		
		var list = $firebaseArray(gifRef);
		list.$add(gifData);
	}


	return service;
});