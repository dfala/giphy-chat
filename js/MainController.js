angular.module('giphyApp')

.controller('MainController', function ($scope, giphyService, $firebaseArray) {
	$scope.messages = [];

	var gifRef = new Firebase('https://gifschat.firebaseio.com/gifs');

	$scope.messages = $firebaseArray(gifRef);

	$scope.queryGiphy = function (query) {
		if (!query) return console.warn('No query :(');
		giphyService.getGifs(query);

		$scope.searchQuery = '';
	}
})