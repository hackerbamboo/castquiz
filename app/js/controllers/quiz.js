angular.module('app.controller.Quiz', [])

.controller('QuizCtrl', ['$scope', 'CastService','QuizService', function ($scope, CastService, QuizService) {
	$scope.messages = CastService.messages;
	$scope.currentQuestion = QuizService.currentQuestion;
	$scope.$watch(function () { return QuizService.currentQuestion }, function (newVal, oldVal) {
    if (typeof newVal !== 'undefined') {
        $scope.currentQuestion = QuizService.currentQuestion;
    }
});
}]);