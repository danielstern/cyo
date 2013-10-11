define(['app'] , function (app) {
	app.directive('event', ['eventService', function (es, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page:'=',
      },
      template:function(a,b){
        return "<hidden-event-inspector/>";
    },
      link: function (scope, elem, attrs) {
          var whatHappened = _.keys(attrs.$attr);
      	  es.somethingHappened(whatHappened);
      },
    }
  }]);
})