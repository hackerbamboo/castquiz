angular.module('app.service.Quiz', [])

.service('QuizService', ['$rootScope','$http', '$timeout','PlayerService', function ($rootScope, $http, $timeout,$scope,PlayerService) {

	this.quiz;
	this.currentQuestion = {"question":"question2","choices":["answer1","answer2","answer3","answer4"], "answer":1};
	this.currentIndex = -1;
	this.answers = {};

	this.nextQuestion = function(_this) {
		_this.currentIndex += 1;
		if(_this.currentIndex < _this.quiz.questions.length){
			_this.currentQuestion = _this.quiz.questions[_this.currentIndex];
			_this.currentQuestion.start = new Date().getTime();
			_this.answers = {};
			$timeout(function(event){
				_this.updateScores(_this);
				_this.nextQuestion(_this);
			}, 30000);
		}
	}

	this.updateScores = function(_this) {
		for (sender in _this.answers){
			var ans = _this.answers[sender];
			var score = _this.time - currentQuestion.start;
			if(ans.answer != currentQuestion.answer){
				score *= -1;
			}
			PlayerService.updateScores(sender, score);

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
		message.time = new Date().getTime();
		var senderId = event.senderId;
		answers[senderId] = message;

	}


}]);