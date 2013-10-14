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
      link: function (scope, elem, attrs) {

         scope.buttons = elem.find('button');
         $(scope.buttons).click(function(){

              $(scope.buttons).hide();  // todo: fix

            })

					elem.addClass('pull-down-in');
	        
	        $('html, body').animate({scrollTop: elem.offset().top}, 800);
        },

      }
  });
})