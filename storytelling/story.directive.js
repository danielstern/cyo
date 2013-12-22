define(['app','underscore'] , function (app, _) {
	app.directive('story', ['$compile', 'eventService', function ($compile, es) {
    return {
      restrict: 'E',
      replace:false,
      template:function(elem, atts){

      	return "<chapter " + _.dasherize(atts.first) + " />";

      },
     controller: function ($scope, $attrs, $element) {

        console.log("Attempting to load...")
        var data = localStorage.getItem("data");
        if (!data) {console.log("Couldn't get data...")} 
          else {
            var obj = JSON.parse(_.dataToString(data));
            console.log("Got data...",obj);
          }

     		this.nextChapter = function(page) {

        _.delay(function(){

            // this is pretty hacky
       			var el = angular.element("<chapter url='" + page + "'></chapter>");
       			var cmpl = $compile(el);
            $element.append(el);
            cmpl($scope);

            $('body').animate(
              	{scrollTop: el.offset().top}, 
              	1024
              );

          }, 500);

          es.logChapter(page);
          this.save();
     		}



        this.logEvent = function(event) {
          es.somethingHappened(event);
     //     console.log("Logging vevent...", event)
        }

        this.save = function() {
          //console.log("Saving...");
          function toHash(str) {return btoa(unescape(encodeURIComponent(str)))};
          
          var events = es.getAllThingsPassed();
          //console.log("Getting events...", events);
          var pages = es.getAllPages();
          var r = {};
          r.e = events;
          r.p = pages;
          var k = toHash(JSON.stringify(r));
          console.log("Saving game...", r,k);
          localStorage.setItem("data",k);


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