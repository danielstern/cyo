define(['app'], function (app) {
  app.directive('hoverwindow', [function () {
    return {
      scope: {
        onReveal:'=',
      },
      require: ['^story'],
      restrict: 'AE',
      template: function (a, b) {
        return "<div class='hoverwindow'>"+a.html()+"</div>";
      },
      link: function (scope, elem, attrs,ctrl) {

        console.log("Story?",story);
        var story = ctrl[0];
        elem.on('mouseover',function(){
        story.logEvent(scope.onReveal)
        })
            
      },
    }
  }]);
})