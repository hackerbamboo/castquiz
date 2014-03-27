angular.module('app', [
	'ngRoute',
	'app.controller.Quiz',
	'app.service.Cast',
	'app.service.Quiz',
	'app.service.Player',
	'app.service.Message'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/quiz', {
		templateUrl: 'partials/quiz.html',
		controller: 'QuizCtrl'
	}).otherwise({
		redirectTo: '/lobby'
	});
}]);