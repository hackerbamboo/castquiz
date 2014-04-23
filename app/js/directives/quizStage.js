angular.module('app.directive.Quiz', [])

.directive('quizStage', function() {
    return {
        restrict: 'E',
        scope: {
            show: '@',
            question: '='
        },
        templateUrl: 'template/stage.html',
        link: function(scope, element, attrs) {
            attrs.$observe('question', function(q) {
                console.log(scope.question);
                scope.show = false;
            });
        }
    };
});
