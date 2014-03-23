angular.module('app.service.Quiz', [])

.service('QuizService', ['$rootScope','$http', '$timeout',function ($rootScope, $http, $timeout,$scope) {

	this.quiz;
	this.currentQuestion = {"question":"question2","choices":["answer1","answer2","answer3","answer4"], "answer":1};
	this.currentIndex = -1;
	this.answers = {};

	this.nextQuestion = function(_this){
		_this.currentIndex += 1;
		if(_this.currentIndex < _this.quiz.questions.length){
			_this.currentQuestion = _this.quiz.questions[_this.currentIndex];
			_this.answers = {};
			$timeout(function(event){
				_this.nextQuestion(_this)
			}, 30000);
		}
	}

	this.loadQuiz = function(event){
		var _this = this;
		$http.get("quizes/quiz1.json").success(function(data, status, headers, config){
			_this.quiz = data;
		});
	}

	this.receiveAnswer = function(event){
		var message = event.data;
		var senderId = event.senderId;
		this.answers[senderId] = message;

	}


}]);