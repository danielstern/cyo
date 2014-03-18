define(['app','underscore','css!global/styles.css'] , function (app, _) {
	app.directive('chapter', function () {
    return {
      restrict: 'E',
      replace:true,
      scope: {
        url:'=',
      },
      templateUrl:function(elem, atts){

      	var url = atts.url;
      	url = url || _.dasherize(_.keysToKeyword(atts.$attr));
        return "story/"+ url +".html";

      },
      controller: function ($scope, $attrs, $element) {
     		
        this.over = function() {
     			$element.addClass('chapter-fade');
          var buttons = $element.find('button');
          buttons.hide();
          
     		}      
      },
      
      link: function (scope, elem, attrs) {

					elem.addClass('pull-down-in');

        },

      }
  });
})