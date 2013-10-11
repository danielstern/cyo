define(['app'] , function (app) {
	app.directive('gameOption', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        page:'=',
      },
      link: function (scope, elem, attrs) {
        console.log("Detected game-option...", elem, scope.page);
          elem.bind('click', function(e){
            var el = angular.element("<div story-part>123445</div>")
            var next = $compile(el)
          //  console.log("Next?",next)
              elem.after(el);
              next(scope)
           })
      },
    }
  });
})