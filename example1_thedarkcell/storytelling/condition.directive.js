define(['app'], function (app) {
  app.directive('condition', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        controller: function ($scope, $attrs) {

          this.happened = function () {

            var keys = _.keys($attrs.$attr);
            var req = _.keysToKeyword(keys);
            var neg = _.contains(keys, 'not');
            return es.didItHappen(req, neg);
          }

        },
        template: function (a, b) {
          return "<div>" + a.html() + "</div>"
        },
        link: function (scope, elem, attrs, ctrl) {

          scope.itHappened = false;
          var keys = _.keys(attrs.$attr);
          var req = _.keysToKeyword(keys);
          var neg = _.contains(keys, 'not');

          scope.itHappened = es.didItHappen(req, neg);

          if (!scope.itHappened) elem.addClass('hidden');
        },
      }
    }
  ]);
})