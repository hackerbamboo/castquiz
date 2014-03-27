angular.module('app.service.Quiz', [])

.service('QuizService', ['$rootScope','$http', '$timeout','PlayerService', 'MessageService', function ($rootScope, $http, $timeout,PlayerService,MessageService) {

	this.quiz;
	this.currentQuestion = {}
	this.currentIndex = -1;
	this.answers = {};
	this.gameState = "TITLE";

	function OutBoundQuizQuestion(question) {
	  this.question = question.question;
	  this.choices = question.choices;
	}

	this.nextQuestion = function(_this) {
		if(this.currentIndex === -1){
			_this.gameState = "STARTED";
			MessageService.broadcastMessage({gameState : _this.gameState});
		}

		_this.currentIndex += 1;
		if(_this.currentIndex < _this.quiz.questions.length){
			_this.currentQuestion = _this.quiz.questions[_this.currentIndex];
			_this.currentQuestion.start = new Date().getTime();
			MessageService.broadcastMessage(new OutBoundQuizQuestion(_this.currentQuestion))
			_this.answers = {};
			$timeout(function(event){
				_this.updateScores(_this);
				_this.nextQuestion(_this);
			}, 300000);
		} else {
			_this.gameState = "GAME_OVER";
			MessageService.broadcastMessage({gameState:_this.gameState})
			PlayerService.clearPlayers();
		}
	}

	this.updateScores = function(_this) {
		for (sender in _this.answers){
			var ans = _this.answers[sender];
			var score = _this.time - currentQuestion.start;
			var correct = true;
			if(ans.answer != currentQuestion.answer){
				score *= -1;
				correct = false;
			}
			PlayerService.updateScores(sender, score);
			MessageService.sendMessage(sender, {score:score,correct:correcti})
		}
	}

	this.loadQuiz = function(event){
		var _this = this;
		$http.get("quizes/quiz1.json").success(function(data, status, headers, config){
			_this.quiz = data;
		});
		this.currentIndex = -1;
		this.gameState = "LOBBY";
		MessageService.broadcastMessage({gameState : _this.gameState});
	}

	this.receiveAnswer = function(event){
		var message = event.data;
		message.time = new Date().getTime();
		var senderId = event.senderId;
		answers[senderId] = message;

	}


}]);