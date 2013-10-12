define(['app'] , function (app) {
	app.directive('event', ['eventService', function (es, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page:'=',
      },
      link: function (scope, elem, attrs) {
          var whatHappened = _.keys(attrs.$attr);
      	  es.somethingHappened(whatHappened);

          scope.$watch(elem,function(){
          	if (elem.hasClass('cancelled')) {
          		es.itDidNotHappen(whatHappened);
          	}
          })
      },
    }
  }]);
})