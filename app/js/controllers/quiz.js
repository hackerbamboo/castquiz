angular.module('app.controller.Quiz', [])

.controller('QuizCtrl', ['$scope', 'CastService', function ($scope, CastService) {
	$scope.messages = CastService.messages;
}]);