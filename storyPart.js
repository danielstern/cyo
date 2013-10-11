define(['app'] , function (app) {
	app.directive('storyPart', function () {
    return {
      restrict: 'A',
      replace:true,
      scope: {
        url:'=',
      },
      //template:"<div ng-include='\"story/"+"001"+".html\"'></div>",
      templateUrl:"story/001.html",
      link: function (scope, elem, attrs) {
        console.log("Detected story part...", scope.url);

        },
    }
  });
})