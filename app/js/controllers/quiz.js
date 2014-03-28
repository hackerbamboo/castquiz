angular.module('app.controller.Quiz', [])

.controller('QuizCtrl', ['$scope', 'CastService','QuizService','PlayerService', function ($scope, CastService, QuizService, PlayerService) {

	$scope.messages = CastService.messages;
	$scope.currentQuestion = QuizService.currentQuestion;
	$scope.players = PlayerService.players;

	$scope.$watch(function () { return QuizService.currentQuestion }, function (newVal, oldVal) {
	    if (typeof newVal !== 'undefined') {
	        $scope.currentQuestion = QuizService.currentQuestion;
	    }
	});

	$scope.player1 = {
		senderId: 1,
		name: "Player 1"
	};

	$scope.player2 = {
		senderId: 2,
		name: "Player 2"
	};

	$scope.player3 = {
		senderId: 3,
		name: "Player 3"
	};

	$scope.player4 = {
		senderId: 4,
		name: "Player 4"
	};
}]);