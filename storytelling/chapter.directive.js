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

         var page = elem;
          console.log("Page?", page)
	        page.addClass('animate');
	        page.addClass('zipped-up');
	        _.defer(function(){
	        	page.addClass('opened-up');
	        })
        },

      }
  });
})