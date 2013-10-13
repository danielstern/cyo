define(['app'] , function (app) {
	app.directive('event', ['eventService', function (es, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page:'=',
      },
      link: function (scope, elem, attrs) {
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
          		else  if (cleared) {
          				es.somethingHappened(whatHappened);
          		}
          	}
          })
      },
    }
  }]);
})