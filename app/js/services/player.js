angular.module('app.service.Player', [])

.service('PlayerService', ['$rootScope', 'MessageService', '$animate',
    function($rootScope, MessageService, $animate) {

        this.players = {};

        function QuizPlayer(event) {
            this.name = event.data.name;
            this.score = 0;
            this.fastestAnswer = 1000;
            this.slowestAnswer = -1;
            this.correct = 0;
            this.incorrect = 0;
            this.answered = false;
        }

        this.setAnswered = function(senderId) {
            this.players[senderId].answered = true;
        }

        this.setHost = function(senderId) {
            this.players[senderId].host = true;
        }

        this.playerJoin = function(event) {
            var senderId = event.senderId;
            this.players[senderId] = new QuizPlayer(event);
        }

        this.sendStats = function(event) {
            var player = this.players[event.senderId];
            MessageService.sendMessage(event.senderId, player);
        }

        this.removePlayer = function(event) {
            delete this.players[event.senderId];
        }

        this.setWinners = function() {
            var winningScore;
            for (key in this.players) {
                var player = this.players[key];
                if (!winningScore) {
                    winningScore = player.score
                    this.winner = player.name;
                } else if (player.score > winningScore) {
                    winningScore = player.score
                    this.winner = player.name;
                } else if (player.score === winningScore) {
                    this.winner += " " + player.name;
                }


            }
        }

        this.updateScore = function(senderId, points, seconds, correct) {
            this.players[senderId].score += points;
            if (correct) {
                this.players[senderId].correct++;
            } else {
                this.players[senderId].incorrect++;
            }
            if (seconds < this.players[senderId].fastestAnswer) {
                this.players[senderId].fastestAnswer = seconds
            }

            if (seconds > this.players[senderId].slowestAnswer) {
                this.players[senderId].slowestAnswer = seconds
            }
            this.players[senderId].answered = false;
            $animate.addClass($("#" + senderId), "correct", function() {
                $animate.removeClass($("#" + senderId), "correct")
            });

        }

        this.clearPlayers = function() {
            this.players = {};
        }


    }
]);
