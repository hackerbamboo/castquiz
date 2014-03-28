angular.module('app', [
	'ngRoute',
	'app.controller.Main',
	'app.controller.Lobby',
	'app.controller.Quiz',
	'app.service.Cast',
	'app.service.Quiz',
	'app.service.Player',
	'app.service.Message'
])
.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider.when('/lobby', {
		templateUrl: 'partials/lobby.html',
		controller: 'LobbyCtrl'
	}).when('/quiz', {
		templateUrl: 'partials/quiz.html',
		controller: 'QuizCtrl'
	}).otherwise({
		redirectTo: '/lobby'
	});
	//$locationProvider.html5Mode(true);
}]);