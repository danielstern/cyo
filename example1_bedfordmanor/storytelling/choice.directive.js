define(['app'], function (app) {
  app.directive('choice', ['eventService', '$http',
  	function (es, $http) {
    return {
      restrict: 'AE',
      scope: {
        page: '=',
        condition: '=',
      },
      require:['^story','^chapter'],
      template: function (a, b) {
        return "<button class='btn btn-default'>" + a.html() + "</button>";
      },
      link: function (scope, elem, attrs, ctrls) {
        var page;
        var condition;
        var story = ctrls [0];
        var chapter = ctrls [1];

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

        elem.bind('click', handleButtonClick);
        function handleButtonClick() {
        	chapter.over();
        	story.nextChapter(page);
        }
				
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