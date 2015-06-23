angular.module('giphyApp')

.directive('uxUi', function ($timeout) {
	return {
		restrict: 'AE',
		scope: true,
		link: function (scope, elem, attrs) {
			//focus on input field
			$('#input-field').focus();
		}
	}
})