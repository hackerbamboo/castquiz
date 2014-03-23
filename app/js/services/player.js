angular.module('app.service.Player', [])

.service('PlayerService', ['$rootScope',function ($rootScope) {

	this.players = {};
	
	this.setHost = function(senderId){
		players[senderId].host = true;
	}

	this.playerJoin = function(event){
		var message = event.data;
		message.score = 0;
		var senderId = event.senderId;
		players[senderId] = message;
	}

	this.updateScore = function(senderId, points){
		players[senderId] += score;
	}


}]);