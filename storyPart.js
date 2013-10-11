define(['app','underscore'] , function (app, _) {
	app.directive('storyPart', function () {
    return {
      restrict: 'A',
      replace:true,
      scope: {
        url:'=',
      },
      
      templateUrl:function(elem, atts){
       // console.log("template...",elem,atts)
        return "story/"+atts.url+".html";
      },
      link: function (scope, elem, attrs) {

        scope.buttons = elem.find('button');
     //   console.log("Detected story part...", scope.url);
        _.each(scope.buttons, function(button) {
   //       console.log("Button?",button);
            $(button).click(function(){
              console.log("Clicked a button...");
            //  scope.hideAllButtons()
              $(scope.buttons).hide();
            })



        });

        },
    }
  });
})