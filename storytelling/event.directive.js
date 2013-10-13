define(['app'], function (app) {
  app.directive('event', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        transclude: true,
        scope: true,
        require: '?^condition',
        link: function (scope, elem, attrs, cond) {
          if (cond) {
            scope.cancelled = cond.isCancelled();
            if (scope.cancelled) return;
          }

          var whatHappened = _.keys(attrs.$attr);
          if (_.contains(whatHappened, 'clear')) {
            es.itDidNotHappen(whatHappened);
          } else {
            es.somethingHappened(whatHappened);
          }
        },
      }
    }
  ]);
})