angular.module('giphyApp')

.factory('getDataService', function ($http, $q) {
	var service = {};

	service.getData = function (searchQuery) {
		var deferred = $q.defer();
		// Visit API docs for more info: https://github.com/Giphy/GiphyAPI
		var url = "https://api.giphy.com/v1/gifs/search?q=";
		var apiKey = "&api_key=dc6zaTOxFJmzC";

		url += encodeURI(searchQuery) + apiKey;

		$http.get(url)
			.success(function (response) {
				// console.log(data);
				deferred.resolve(response.data);
			})
			.error(function (err) {
				deferred.reject(err);
			});

		return deferred.promise;
	}

	return service;
})