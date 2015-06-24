angular.module('giphyApp')

.controller('MainController', function ($scope, $timeout, votingService, giphyService, $firebaseArray) {
	$scope.messages = [];

	var gifRef = new Firebase('https://gifschat.firebaseio.com/gifs');

	$scope.messages = $firebaseArray(gifRef);

	$scope.queryGiphy = function (query) {
		if (!query) return console.warn('No query :(');
		giphyService.getGifs(query);

		$timeout(function () {
			$scope.searchQuery = '';
			$('#input-field').focus();
		}, 1);
	}

	$scope.upVote = function (messageId, voteCount) {
		votingService.upVote(messageId, voteCount);
	}

	$scope.downVote = function (messageId, voteCount) {
		console.info(messageId);
		votingService.downVote(messageId, voteCount);
	}
})