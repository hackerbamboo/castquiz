angular.module('app.service.Message', [])

.service('MessageService', ['$rootScope', function ($rootScope) {

	this.castMessageBus = {};
	this.version = "1.0.0";

	this.sendMessage = function(senderId, message) {
		message.version = this.version;
    	this.castMessageBus.send(senderId, JSON.stringify(message));
	}

	this.broadcastMessage = function(message) {
		message.version = this.version;
    	this.castMessageBus.broadcast(JSON.stringify(message));
	}

}]);