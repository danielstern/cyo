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
        //	console.log("this scope has a condition...", condition);
        	var neg = false;
        	if (_.has(attrs,'unless')) {
       //		console.log("This is a negative condition.")
        	 neg = true;
        	}

        	var itHappened = es.didItHappen(condition, neg);
       // 	console.log("Valid?",itHappened);
        	if (!itHappened) elem.hide();
        }

        var el = angular.element("<chapter url='" + page + "'></chapter>");

        scope.nextChapter = function() {
        	var cmpl = $compile(el)
          elem.after(el);
          cmpl(scope);
        }

        elem.bind('click', scope.nextChapter);

         elem.addClass('animate-slow');
	        elem.addClass('kate-moss');
	        _.defer(function(){
	        	elem.addClass('full-width');
	        })

        $http({
          method: "GET",
          url: 'story/' + page + '.html',
        })
        .error(function (data, status) {
          var btn = elem.find('button');
          btn.attr('disabled', true)
          btn.addClass('btn-disabled')
          btn.attr('title', "To be continued...")
        });
      },
    }
  }]);
})