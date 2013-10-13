define(['app'] , function (app) {
	app.directive('event', ['eventService', function (es, $compile, $http) {
    return {
      restrict: 'E',
      transclude: true,
      scope: true,
      require: '?^condition',
      link: function (scope, elem, attrs, ctrl) {

      	console.log("Ctrl?",ctrl);
      	scope.cancelled = ctrl.isCancelled();
      	//var parent = scope.$parent;
      	//console.log("Got cancelled...",cancelled);

        var whatHappened = _.keys(attrs.$attr);
        var cleared = false;
         if (_.contains(whatHappened, 'clear')) {
         		 es.itDidNotHappen(whatHappened);
         		 cleared = true;
         } else {
      	  es.somethingHappened(whatHappened);
      	}

        scope.$watch(elem,function(){
        	if (elem.hasClass('cancelled')) {
        		if (!_.contains(whatHappened, 'clear')) {
        			es.itDidNotHappen(whatHappened);
        		}
        		else if (cleared) {
      				es.somethingHappened(whatHappened);
        		}
        	}
        })
      },
    }
  }]);
})