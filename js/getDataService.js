angular.module('giphyApp')

.factory('getDataService', function ($http, $q, $firebaseArray) {
	var service = {};
	var gifRef = new Firebase('https://gifschat.firebaseio.com/gifs');

	service.getGifs = function (searchQuery) {
		var deferred = $q.defer();
		// Visit API docs for more info: https://github.com/Giphy/GiphyAPI
		var url = "https://api.giphy.com/v1/gifs/search?q=";
		var apiKey = "&api_key=dc6zaTOxFJmzC";

		url += encodeURI(searchQuery) + apiKey;

		$http.get(url)
			.success(function (response) {
				var randomNum = Math.round(Math.random() * (response.data.length - 1));
				// console.log(response.data[randomNum]);
				var gif = response.data[randomNum];

				saveMessage(gif);
				deferred.resolve(gif);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	}

	var saveMessage = function (gifData) {
		gifRef.push(gifData);
	}



	// get initial data
	service.getInitialData = function () {
		var deferred = $q.defer();

		gifRef.on('value', function (snapshot) {
			console.log('firebase data:', snapshot.val())
			var data = snapshot.val();
			var tempArray = [];

			for (var key in data) {
				tempArray.unshift(data[key]);
			}

			deferred.resolve(tempArray);
		})

		return deferred.promise;
	}

	return service;
})