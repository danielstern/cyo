define(['app'], function (app) {
  app.directive('condition', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        transclude: true,
        controller : function($scope) {
          
          this.isCancelled = function() {
          	var cancelled = ($scope.itHappened) ? true : false;
          	console.log("Did this happen?",$scope.itHappened)
           	return cancelled;
          }
          
       
    		},
        link: function (scope, elem, attrs) {
         
          scope.itHappened;
          var whatHappened = _.keys(attrs.$attr);

          if (_.contains(whatHappened, 'not')) {
            scope.itHappened = !es.conditionToValidity(whatHappened);
          } else {
            scope.itHappened = es.conditionToValidity(whatHappened);
          }

          if (!scope.itHappened) elem.addClass('hidden');
        },
      }
    }
  ]);
})