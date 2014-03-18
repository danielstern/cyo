define(['app','underscore','css!global/styles.css'] , function (app, _) {
	app.directive('crossroads', function () {
    return {
      restrict: 'E',
      replace:true,
      templateUrl:function(elem, atts){
      	var key = _.first(_.keys(atts.$attr));
      	var url = atts.$attr[key];
        return "story/"+url+".html";
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