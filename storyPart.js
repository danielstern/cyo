define(['app'] , function (app) {
	app.directive('storyPart', ['storytellingService', function (ss) {
    return {
      restrict: 'A',
      scope: {
      },
      link: function (scope, elem, attrs) {
        console.log("Detected story part...", elem, scope.page);
          elem.bind('click', function(){
           
          })

        },
    }
  }]);
})