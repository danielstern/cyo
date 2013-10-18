define(['app'], function (app) {
  app.directive('event', ['eventService',
    function (es, $compile, $http) {

      var testMode = false; 
      return {
        restrict: 'E',
        require: '?^condition',
        template: function(a,b) {
          console.log("Event?",b);
          if (testMode) return "<p class='evt'>("+ _.values(b.$attr)[0] +")</p>"
        },
        link: function (scope, elem, attrs, condition) {
          if (condition) {

            if (!condition.happened()) return;
          }

          var keys = _.keys(attrs.$attr);
          var e = _.keysToKeyword(keys);

          if (_.contains(keys, 'clear')) {
            es.clearEvent(e);
          } else {
            es.somethingHappened(e);
          }
        },
      }
    }
  ]);
})