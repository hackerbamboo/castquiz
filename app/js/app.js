angular.module('app', [
	'ngRoute',
	'app.controller.Main',
	'app.controller.Quiz',
	'app.controller.Footer',
	'app.service.Cast'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/quiz', {
		templateUrl: 'partials/quiz.html',
		controller: 'QuizCtrl'
	}).otherwise({
		redirectTo: '/quiz'
	});
}]);