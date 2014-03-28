angular.module('app.controller.Lobby', [])

.controller('LobbyCtrl', ['$scope', 'CastService','QuizService','PlayerService', function ($scope, CastService, QuizService, PlayerService) {
	$scope.players = PlayerService.players;
}]);