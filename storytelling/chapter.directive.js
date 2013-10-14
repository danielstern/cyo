define(['app','underscore','css!global/styles.css'] , function (app, _) {
	app.directive('chapter', function () {
    return {
      restrict: 'E',
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

	       /* elem.addClass('animate');
	        elem.addClass('zipped-up');
	          _.defer(function(){
	        	elem.addClass('opened-up');
	        })*/

					elem.addClass('pull-down-in');
	        
	      //  console.log("Animating body...");
	        $('html, body').animate({scrollTop: elem.offset().top}, 800);
        },

      }
  });
})