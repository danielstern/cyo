define(['app'], function (app) {
  app.directive('choice', ['eventService', '$compile', '$http',
  	function (es, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page: '=',
        condition: '=',
      },
      template: function (a, b) {
        return "<button class='btn btn-default'>" + a.html() + "</button>";
      },
      link: function (scope, elem, attrs) {
        var page;
        var condition;
        page = scope.page || _.dasherize(_.keysToKeyword(attrs.$attr));

        if (_.has(attrs,'condition')) {
        	condition = _.camelize(attrs.condition);
        }

        if (condition) {
        	var neg = false;
        	if (_.has(attrs,'unless')) {
        	 neg = true;
        	}

        	var itHappened = es.didItHappen(condition, neg);
        	if (!itHappened) elem.hide();
        }

        var el = angular.element("<chapter url='" + page + "'></chapter>");

        scope.nextChapter = function() {
        	var cmpl = $compile(el)
          elem.parent().after(el);
          cmpl(scope);
        }

        elem.bind('click', scope.nextChapter);
				
				elem.addClass('pull-right-in-slow');

        $http({
          method: "GET",
          url: 'story/' + page + '.html',
        })
        .error(function (data, status) {
          elem.find('button').addClass('btn-disabled');
        });
      },
    }
  }]);
})