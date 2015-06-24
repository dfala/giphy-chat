angular.module('giphyApp')

.controller('MainController', function ($scope, $timeout, giphyService, $firebaseArray) {
	$scope.messages = [];

	var gifRef = new Firebase('https://gifschat.firebaseio.com/gifs');

	$scope.messages = $firebaseArray(gifRef);
	$timeout(function () {
		console.log($scope.messages)
	}, 1000)

	$scope.queryGiphy = function (query) {
		if (!query) return console.warn('No query :(');
		giphyService.getGifs(query);

		$scope.searchQuery = '';
	}
})