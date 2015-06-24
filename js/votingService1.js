angular.module('giphyApp')

.factory('votingService', function () {
	var service = {};

	var baseUrl = 'https://gifschat.firebaseio.com/gifs/';

	service.upVote = function (messageId, voteCount) {
		var messageRef = new Firebase(baseUrl + messageId);
		var newCount = voteCount + 1;
		messageRef.update({
			votes: newCount
		});
	}

	service.downVote = function (messageId, voteCount) {
		var messageRef = new Firebase(baseUrl + messageId);

		var newCount = voteCount - 1;
		if (newCount < 0) {
			messageRef.remove();
		} else {
			messageRef.update({
				votes: newCount
			});
		}
	}

	return service;
})