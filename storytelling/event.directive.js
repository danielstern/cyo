define(['app'], function (app) {
  app.directive('event', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        transclude: true,
        scope: true,
        require: '?^condition',
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