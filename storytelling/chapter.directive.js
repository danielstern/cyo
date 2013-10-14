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

         // hacky
         scope.buttons = elem.find('button');
         $(scope.buttons).click(function(){
              $(scope.buttons).hide();
              //elem.addClass('chapter-fade');
            })

					elem.addClass('pull-down-in');
	        
	        $('html, body').animate({scrollTop: elem.offset().top}, 800);
        },

      }
  });
})