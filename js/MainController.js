angular.module('giphyApp')

.controller('MainController', function ($scope, getDataService) {

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

})