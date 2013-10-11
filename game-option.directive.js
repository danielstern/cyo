define(['app'] , function (app) {
	app.directive('gameOption', ['storytellingService', function (ss) {
    return {
      restrict: 'A',
      scope: {
        page:'=',
      },
      link: function (scope, elem, attrs) {
       // console.log("Detected game-option...", elem, scope.page);
          elem.bind('click', function(e){
            var storyNextPart = ss.getPage(scope.page);
       //    var next = $compile("<div story-part></div")
            elem.after(next);
          })

        },
    }
  }]);
})