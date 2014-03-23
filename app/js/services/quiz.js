angular.module('app.service.Quiz', [])

.service('QuizService', ['$rootScope','$http', '$timeout', function ($rootScope, $http, $timeout) {

	this.quiz;
	this.currentQuestion;
	this.currentIndex = -1;
	this.answers = {};

	this.nextQuestion = function(_this){
		_this.currentIndex += 1;
		if(_this.currentIndex < _this.quiz.questions.length){
			_this.currentQuestion = _this.quiz.questions[_this.currentIndex];
			_this.answers = {};
			$timeout(_this.timeUp, 30000);
		}
	}

	this.loadQuiz = function(event){
		var _this = this;
		$http.get("quizes/quiz1.json").success(function(data, status, headers, config){
			_this.quiz = data;
			_this.nextQuestion(_this);
		});
	}

	this.receiveAnswer = function(event){
		var message = event.data;
		var senderId = event.senderId;
		answers[senderId] = message;

	}

	this.timeUp = function(event){
		this.nextQuestion()
	}


}]);