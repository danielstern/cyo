define(['app'] , function (app) {
	app.directive('event', ['eventService', function (es, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page:'=',
      },
      template:function(a,b){
        console.log("A,B?",a,b)
        return "!!";
    },
      link: function (scope, elem, attrs) {
          console.log("its an event...", es)
      },
    }
  }]);
})