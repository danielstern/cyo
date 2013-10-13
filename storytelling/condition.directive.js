define(['app'], function (app) {
  app.directive('condition', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        controller : function($scope) {
          
          this.isCancelled = function() {
           	return !$scope.itHappened;
          }
          
       
    		},
        link: function (scope, elem, attrs) {
         
          scope.itHappened;
          var whatHappened = _.keys(attrs.$attr);

          if (_.contains(whatHappened, 'not')) {
            scope.itHappened = !es.didThisHappen(whatHappened);
          } else {
            scope.itHappened = es.didThisHappen(whatHappened);
          }

          if (!scope.itHappened) elem.addClass('hidden');
        },
      }
    }
  ]);
})