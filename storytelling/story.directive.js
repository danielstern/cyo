define(['app','underscore','css!global/styles.css'] , function (app, _) {
	app.directive('story', ['$compile', 'eventService', function ($compile, es) {
    return {
      restrict: 'E',
      replace:false,
      template:function(elem, atts){

      	return "<chapter " + _.dasherize(atts.first) + " />";

      },
     controller: function ($scope, $attrs, $element) {

     		this.nextChapter = function(page) {

          _.delay(function(){

     			var el = angular.element("<chapter url='" + page + "'></chapter>");
     			var cmpl = $compile(el)
          $element.append(el);
          cmpl($scope);

          $('body').animate(
          	{scrollTop: el.offset().top}, 
          	1024
          );

        }, 500)
     		}

     		this.restart = function() {
     			console.log("Story restarting..");
     			var el = angular.element("<chapter url='intro'></chapter>");
     			var cmpl = $compile(el)
     			$element.html('');
     			$element.append(el);
     			cmpl($scope);

     			es.clearAll();
   			  $('body').animate(
          	{scrollTop: 0}, 
          	204
          );
     		}
      
      },
    }
  }]);
})