angular.module('app.service.Cast', [])

.service('CastService', ['$rootScope', 'QuizService', function ($rootScope, QuizService) {

	this.messages = [];

    this.onSenderConnected = function(event) {
    	console.log("Sender Connected");
    	console.log(event);
	}

	this.onSenderDisconnected = function(event) {
    	console.log("Sender Disconnected");
    	console.log(event);
	}

	this.onMessage = function(event) {
		var message = event.data;
		var senderId = event.senderId;

		this.messages.push(message);
		$rootScope.$apply();

		switch(message.command)
		{
			case "newgame":
				console.log("Player " + senderId + ": New Game with Category: " + message.category);
				QuizService.loadQuiz();
				break;
			case "join":
				console.log("Player " + senderId + ": Join Game with Name: " + message.name);
				break;
			case "answer":
				console.log("Player " + senderId + ": Answer Question ID: " + message.questionId + "With Answer Index: " + message.index);
				QuizService.receiveAnswer(event);
				break;
			case "quit":
				console.log("Player " + senderId + ": Quit Current Game");
			case "start":
				console.log("Player " + senderId + ": Start Game");
				QuizService.nextQuestion(QuizService);
				break;
			default:
				console.log("ERROR: INVALID COMMAND");
		}
	}

	// Cast Receiver Manager
    this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    this.castReceiverManager.onSenderConnected = this.onSenderConnected.bind(this);
    this.castReceiverManager.onSenderDisconnected = this.onSenderDisconnected.bind(this);

    // Cast Receiver Message Bus
    this.castMessageBus = this.castReceiverManager.getCastMessageBus('urn:x-cast:com.google.cast.sample.helloworld', cast.receiver.CastMessageBus.MessageType.JSON);
    this.castMessageBus.onMessage = this.onMessage.bind(this);

    // Start Cast Receiving
    this.castReceiverManager.start({statusText: "Application is starting"});

}]);