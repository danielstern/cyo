define(['app'] , function (app) {
	app.directive('gameOption', function ($compile, $http) {
    return {
      restrict: 'A',
      scope: {
        page:'=',
      },
      link: function (scope, elem, attrs) {
            var el = angular.element("<div story-part url='"+scope.page+"'></div>")
            $http({method: "GET", url: 'story/' +scope.page +'.html',})
            .error(function(data, status) {
             
              elem.attr('disabled',true)
          });
          elem.bind('click', function(e){

             var next = $compile(el)
              elem.after(el);
              next(scope);

           })

          //console.log("Scope?", $scope)

          scope.hide = function(){elem.hide()};
      },
    }
  });
})