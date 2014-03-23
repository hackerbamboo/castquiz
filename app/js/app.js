angular.module('app', [
	'ngRoute',
	'app.controller.Main',
	'app.controller.Lobby',
	'app.controller.Quiz',
	'app.service.Cast',
	'app.service.Quiz'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/lobby', {
		templateUrl: 'partials/lobby.html',
		controller: 'LobbyCtrl'
	}).when('/quiz', {
		templateUrl: 'partials/quiz.html',
		controller: 'QuizCtrl'
	}).otherwise({
		redirectTo: '/lobby'
	});
}]);