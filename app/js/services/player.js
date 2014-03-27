angular.module('app.service.Player', [])

.service('PlayerService', ['$rootScope',function ($rootScope) {

	this.players = {};
	
	this.setHost = function(senderId){
		this.players[senderId].host = true;
	}

	this.playerJoin = function(event){
		var message = event.data;
		message.score = 0;
		var senderId = event.senderId;
		this.players[senderId] = message;
	}

	this.updateScore = function(senderId, points){
		this.players[senderId] += score;
	}


}]);