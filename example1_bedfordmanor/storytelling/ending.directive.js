define(['app'], function (app) {
  app.directive('ending', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        template: function (a, b) {
          return "<div class='ending'><div class='end-title'>THE END</div><div class='end-caption'>" + a.html() + "</div></div>";
        }
      }
    }
  ]);
})