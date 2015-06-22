angular.module('giphyApp')

.controller('MainController', function ($scope, getDataService) {

	$scope.queryGiphy = function (query) {
		if (!query) return console.warn('No query :(');

		getDataService.getData(query)
			.then(function (response) {
				console.log('response on controller: ', response);
				$scope.gifs = response;
			})
			.catch(function (err) {
				throw new Error(err);
			})

	}

})