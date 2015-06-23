angular.module('giphyApp')

.controller('MainController', function ($scope, getDataService) {
	$scope.messages = [];


	var initData = function () {
		getDataService.getInitialData()
		.then(function (response) {
			$scope.messages = response;
		})
		.catch(function (err) {
			throw new Error(err);
		});
	}
	initData();


	$scope.queryGiphy = function (query) {
		if (!query) return console.warn('No query :(');

		getDataService.getGifs(query)
		.then(function (response) {
			$scope.gif = response;
		})
		.catch(function (err) {
			throw new Error(err);
		})
	}

	var getMoreMessages = function () {
		getDataService.getMoreData()
		.then(function (response) {
			$scope.messages.unshift(response);
		})
	}
	getMoreMessages();

})