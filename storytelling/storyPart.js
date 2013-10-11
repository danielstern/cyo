define(['app','underscore','css!global/styles.css'] , function (app, _) {
	app.directive('storyPart', function () {
    return {
      restrict: 'A',
      replace:true,
      scope: {
        url:'=',
      },
      templateUrl:function(elem, atts){
        return "story/"+atts.url+".html";
      },
      link: function (scope, elem, attrs) {

         scope.buttons = elem.find('button');

         $(scope.buttons).click(function(){
              $(scope.buttons).hide();
            })
        },
      }
  });
})