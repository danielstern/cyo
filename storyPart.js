define(['app'] , function (app) {
	app.directive('storyPart', function () {
    return {
      restrict: 'A',
      replace:true,
      scope: {
        url:'=',
      },
      
      templateUrl:function(elem, atts){
        console.log("template...",elem,atts)
        return "story/"+atts.url+".html";
      },
      link: function (scope, elem, attrs) {
        console.log("Detected story part...", scope.url);

        },
    }
  });
})