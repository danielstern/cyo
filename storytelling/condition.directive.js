define(['app'], function (app) {
  app.directive('condition', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        controller : function($scope) {
          
          this.happened = function() {
          	return scope.itHappened;
          }
          
    		},
        link: function (scope, elem, attrs) {
         
          scope.itHappened = false;
          var keys = _.keys(attrs.$attr);
          var req = _.keysToKeyword(keys);
          var neg = _.contains(keys, 'not');

          scope.itHappened = es.didItHappen(req, neg);

          if (!scope.itHappened) elem.addClass('hidden');
        },
      }
    }
  ]);
})