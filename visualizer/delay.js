define(['app','underscore','css!global/styles.css'] , function (app, _) {
	app.directive('delay', function () {
    return {
      restrict: 'AE',

      link: function (scope, elem, attrs) {

        var delay = _.sample(_.values(attrs.$attr));

        elem.css('opacity',0)

        _.delay(function(){
          elem.css('opacity',1)
          elem.addClass('fade-in-slow');
        }, delay * 1000)


      },

      }
  });
})