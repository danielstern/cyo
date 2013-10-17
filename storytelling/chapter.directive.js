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
     			var buttons = $element.find('button');
     		//	buttons.hide();
     			$element.addClass('chapter-fade');
          buttons.animate({opacity:0}, 450, function(){
            buttons.hide();
          })
          

     		}      
      },
      link: function (scope, elem, attrs) {

					elem.addClass('pull-down-in');

        },

      }
  });
})