angular.module('app.controller.Footer', [])

.controller('FooterCtrl', ['$scope', function ($scope) {

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