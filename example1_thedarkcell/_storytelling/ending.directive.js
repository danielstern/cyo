define(['app'], function (app) {
  app.directive('ending', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        require: '^story',
        template: function (a, b) {
          return "<div class='ending'><div class='end-title'>THE END</div><div class='end-caption'>" + a.html() + "</div><div class='btn btn-primary btn-lg center-block'>PLAY AGAIN</div></div>";
        },
        link: function (scope, elem, attrs, story) {
        	elem.click(function(){
        		story.restart();
            document.getElementById('click-1').play();
        	});

        }
      }
    }
  ]);
})