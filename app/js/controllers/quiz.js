angular.module('app.controller.Quiz', [])

.controller('QuizCtrl', ['$scope', 'CastService','QuizService', function ($scope, CastService, QuizService) {
	$scope.messages = CastService.messages;
	$scope.currentQuestion = QuizService.currentQuestion
}]);