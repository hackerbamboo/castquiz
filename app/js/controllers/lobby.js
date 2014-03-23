angular.module('app.controller.Lobby', [])

.controller('LobbyCtrl', ['$scope', 'PlayerService', function ($scope, PlayerService) {
	$scope.players = PlayerService.players;
}]);