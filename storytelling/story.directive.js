define(['app','underscore','css!global/styles.css'] , function (app, _) {
	app.directive('story', function () {
    return {
      restrict: 'E',
      replace:false,
      template:function(elem, atts){

      	return "<chapter " + _.dasherize(atts.first) + " />";

      },
      link: function (scope, elem, attrs) {
      	console.log("Story directive...");


      }
    }
  });
})