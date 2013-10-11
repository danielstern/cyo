define(['app'] , function (app) {
	app.directive('choice', function ($compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page:'=',
      },
      template:function(a,b){
        console.log("A,B?",a,b)
        return "<button class='btn btn-default'>"+a.html()+"</button>";
    },
      link: function (scope, elem, attrs) {
            var el = angular.element("<chapter url='"+scope.page+"'></chapter>")
            $http({method: "GET", url: 'story/' +scope.page +'.html',})
            .error(function(data, status) {
             
              var btn = elem.find('button');
              btn.attr('disabled',true)
              btn.addClass('btn-disabled')
              btn.attr('title',"To be continued...")
          });
          elem.bind('click', function(e){

             var cmpl = $compile(el)
              elem.after(el);
              cmpl(scope);

           })
      },
    }
  });
})