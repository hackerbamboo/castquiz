angular.module('app.service.Quiz', ['ngAnimate'])

.service('QuizService', ['$rootScope', '$http', '$timeout', 'PlayerService', 'MessageService', '$animate',
    function($rootScope, $http, $timeout, PlayerService, MessageService, $animate) {

        this.SCORE = 100;
        this.quiz;
        this.currentQuestion = {}
        this.currentIndex = -1;
        this.timer = 30;
        this.answers = {};
        this.gameState = "TITLE";

        this.testAnimate = function() {
            var _this = this;
            $timeout(function(event) {
                _this.gameState = "LOBBY";
                $timeout(function(event) {
                    _this.gameState = "TITLE";
                }, 2000);
            }, 1000);
        }

        function OutBoundQuizQuestion(question) {
            this.question = question.question;
            this.choices = question.choices;
        }

        this.nextQuestion = function(_this) {
            if (this.currentIndex === -1) {
                _this.gameState = "STARTED";
                MessageService.broadcastMessage({
                    gameState: _this.gameState
                });
            }

            _this.currentIndex += 1;
            if (_this.currentIndex < _this.quiz.questions.length) {
                _this.timer = 30;
                _this.currentQuestion = _this.quiz.questions[_this.currentIndex];
                _this.currentQuestion.start = new Date().getTime();
                MessageService.broadcastMessage(new OutBoundQuizQuestion(_this.currentQuestion))
                _this.answers = {};
                _this.updateTime(_this);
            } else {
                _this.gameState = "GAME_OVER";
                MessageService.broadcastMessage({
                    gameState: _this.gameState
                })
                PlayerService.setWinners();
            }
        }

        this.killExistingTimer = function() {
            $timeout.cancel(this.timerPromise);
        }

        this.startGame = function(_this) {

            _this.killExistingTimer();
            _this.nextQuestion(_this);
        }

        this.updateTime = function(_this) {

            if (_this.timer <= 0) {
                _this.updateScores(_this);
                _this.nextQuestion(_this);
            } else {
                _this.timerPromise = $timeout(function(event) {
                    _this.timer -= 1;
                    _this.updateTime(_this);
                }, 1000);
            }
        }

        this.updateScores = function(_this) {
            for (sender in _this.answers) {
                var ans = _this.answers[sender];
                var seconds = (ans.time - _this.currentQuestion.start) / 1000;
                var time = 30 - seconds;
                var score = _this.SCORE * time / 30;
                var correct = true;
                if (ans.answer != _this.currentQuestion.answer) {
                    score *= -1;
                    correct = false;
                }
                PlayerService.updateScore(sender, Math.ceil(score), Math.ceil(seconds), correct);
                MessageService.sendMessage(sender, {
                    score: score,
                    correct: correct
                })
            }
        }

        this.loadQuiz = function(event) {
            var _this = this;
            _this.killExistingTimer();
            $http.get("quizes/quiz1.json").success(function(data, status, headers, config) {
                _this.quiz = data;
            });
            this.currentIndex = -1;
            this.gameState = "LOBBY";
            MessageService.broadcastMessage({
                gameState: _this.gameState
            });
        }

        this.receiveAnswer = function(event) {
            var message = event.data;
            message.time = new Date().getTime();
            var senderId = event.senderId;
            this.answers[senderId] = message;

            if (Object.getOwnPropertyNames(this.answers).length === Object.getOwnPropertyNames(PlayerService.players).length) {
                this.timer = 0;
            }
            PlayerService.setAnswered(senderId);

        }


    }
]);
