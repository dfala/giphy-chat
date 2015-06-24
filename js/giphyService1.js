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
				checkRating(response, searchQuery);
			})
			.error(function (err) {
				throw new Error(err);
			});
	}

	var checkRating = function (gifArray, searchQuery) {
		var randomNum = Math.round(Math.random() * (gifArray.data.length - 1));
		var gif = gifArray.data[randomNum];

		if (gif.rating === 'r') {
			checkRating(gifArray);
		} else {
			saveMessage(gif, searchQuery);
		}
	}


	// save new gif to firebase
	var saveMessage = function (gifData, searchQuery) {
		// gifRef.push(gifData);
		gifData.timestamp = Firebase.ServerValue.TIMESTAMP;
		gifData.votes = 0;
		gifData.searchedQuery = searchQuery;
		
		var list = $firebaseArray(gifRef);
		list.$add(gifData);
	}


	return service;
});