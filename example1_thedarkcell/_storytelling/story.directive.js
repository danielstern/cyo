define(['app','underscore'] , function (app, _) {
	app.directive('story', ['$compile','$location', 'eventService', function ($compile, $location, es) {
    return {
      restrict: 'E',
      replace:false,
      template:function(elem, atts){

      	return "<chapter " + _.dasherize(atts.first) + " />";

      },
      controller: function ($scope, $attrs, $element) {

        var data = '';

        $scope.state = "";

        var st = this;
        if ($location.path()) {
          data = $location.path().split('/')[1].toString();
        } 

        data = data || localStorage.getItem("data");
        if (data) {
          try {
            var obj = JSON.parse(_.dataToString(data));
            console.log("Got data...",obj);
            st.load(obj);
          } catch (e) {
            // doesn't work..?
            console.warn("Cant load this", data);
          }
        }

        $scope.$watch("loadHash",function(val){
          console.log("Loadhash changed...", val);
          try {
            var obj = JSON.parse(_.dataToString(val));
            console.log("Success!");
            st.load(obj);
          } catch (e) {
            console.warn("failure!",e);
          }

        })

        this.load = function(data) {
          console.log("Loading data", data);
          var t = _.last(data.p);
          this.restart(t);
          es.somethingHappened(data.e)
          $scope.saveDisplaying = false;
        }

     		this.nextChapter = function(page) {

     			var el = angular.element("<chapter url='" + page + "'></chapter>");
     			var cmpl = $compile(el);
          $element.append(el);
          cmpl($scope);

          es.logChapter(page);
          this.save();

     		}



        this.logEvent = function(event) {
          es.somethingHappened(event);
        }

        this.save = function() {
                    
          var events = es.getAllThingsPassed();
          var pages = es.getAllPages();
          var r = {};
          r.e = events;
          r.p = pages;
          var k = _.toHash(JSON.stringify(r));
          console.log("Saving game...", r,k);
          localStorage.setItem("data",k);

          $scope.state = k;

        }

     		this.restart = function(page) {
          page = page || "intro";
     			console.log("Story restarting..");
     			var el = angular.element("<chapter url='"+page+"'></chapter>");
     			var cmpl = $compile(el)
     			$element.html('');
     			$element.append(el);
     			cmpl($scope);

     			es.clearAll();
   			
     		}
      
      },
    }
  }]);
})