angular.module('cyo',[])

// Chapter Directive: Loads a seperate HTML file
.directive('chapter', function () {
  return {
    restrict: 'E',
    replace:true,
    scope: {
      url:'=',
    },
    templateUrl:function(elem, atts){

    	var url = atts.url;
    	url = url || _.dasherize(_.keysToKeyword(atts.$attr));
      return "story/"+ url +".html";

    },
    controller: function ($scope, $attrs, $element) {
   		
      this.over = function() {
   			$element.addClass('chapter-fade');
        var buttons = $element.find('button');
        $(buttons).hide();
        
   		}      
    },
    
    }
})

// Chapter Directive: Loads a seperate HTML file
.directive('choice', ['eventService', '$http',
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
        var disabled = false;

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
          if (disabled) return;
         	chapter.over();
        	story.nextChapter(page);
          disabled = true;
        }
				
        $http({
          method: "GET",
          url: 'story/' + page + '.html',
        })
        .error(function (data, status) {
          disabled = true;
          elem.find('.btn').addClass('btn-disabled');
          elem.find('.btn').attr('disabled',true);
        });
      },
    }
  }])
.directive('condition', ['eventService',
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
  ])
.directive('crossroads', function () {
    return {
      restrict: 'E',
      replace:true,
      templateUrl:function(elem, atts){
      	var key = _.first(_.keys(atts.$attr));
      	var url = atts.$attr[key];
        return "story/"+url+".html";
      },
      link: function (scope, elem, attrs) {

         scope.buttons = elem.find('button');

         $(scope.buttons).click(function(){
              $(scope.buttons).hide();
               
            })
        },
      }
    })
.directive('ending', ['eventService',
    function (es, $compile, $http) {
      return {
        restrict: 'E',
        require: '^story',
        template: function (a, b) {
          return "<div class='ending'><div class='end-title'>THE END</div><div class='end-caption'>" + a.html() + "</div><div class='btn btn-primary btn-lg center-block'>PLAY AGAIN</div></div>";
        },
        link: function (scope, elem, attrs, story) {
        	elem.click(function(){
        		story.restart();
            document.getElementById('click-1').play();
        	});

        }
      }
    }
  ])

.directive('event', ['eventService',
    function (es, $compile, $http) {

      var testMode = false; 
      return {
        restrict: 'E',
        require: '?^condition',
        template: function(a,b) {
          console.log("Event?",b);
          if (testMode) return "<p class='evt'>("+ _.values(b.$attr)[0] +")</p>"
        },
        link: function (scope, elem, attrs, condition) {
          if (condition) {

            if (!condition.happened()) return;
          }

          var keys = _.keys(attrs.$attr);
          var e = _.keysToKeyword(keys);

          if (_.contains(keys, 'clear')) {
            es.clearEvent(e);
          } else {
            es.somethingHappened(e);
          }
        },
      }
    }
  ])

.directive('story', ['$compile','$location', 'eventService', function ($compile, $location, es) {
    return {
      restrict: 'E',
      replace:false,
      template:function(elem, atts){


        var target;
        if (atts.first || atts.url) target = atts.first || atts.url;

        if (!target) {
          target = _.find(atts.$attr,function(att){
            return att;
          })
        }

        console.log("Templating story,",atts,target);
        if (!target) throw new Error("You must define a first chapter in story with 'first','url', or with an attribute.");

      	return "<chapter " + _.dasherize(target) + " />";

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
    //        console.log("Got data...",obj);
            st.load(obj);
          } catch (e) {
            // doesn't work..?
  //          console.warn("Cant load this", data);
          }
        }

        $scope.$watch("loadHash",function(val){
      //    console.log("Loadhash changed...", val);
          try {
            var obj = JSON.parse(_.dataToString(val));
            console.log("Success!");
            st.load(obj);
          } catch (e) {
           // console.warn("failure!",e);
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
  }])

.service('eventService', function() {

		this.allThingsPassed = [];
		this.allPages = [];

		this.somethingHappened = function(thing) {
			this.allThingsPassed = this.allThingsPassed.concat(thing);
		}

		this.didItHappen = function(condition, neg) {

			var r = false;

			if (_.isArray(condition)) condition = _.keysToKeyword(condition);

			if (_.beginsWithNumber(condition)) {
				var data = _.compoundToObject(condition);
				if (_.count(this.allThingsPassed, data.target) >= data.attribute) r = true;
			}

			if (_.contains(this.allThingsPassed, condition)) r = true;

			if (neg) r = !r;

			return r;
		}

		this.logChapter = function(page) {
			this.allPages = this.allPages.concat(page);
		}

		

		this.getAllThingsPassed = function() {
			return this.allThingsPassed;
		}

		this.getAllPages = function() {
			return this.allPages;
		}

		this.clearEvent = function(thing) {
			this.allThingsPassed = _.without(this.allThingsPassed, thing);
		}

		this.clearAll = function() {
			this.allThingsPassed = [];
		}
	})

.directive('delay', function () {
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

 _.mixin({
    count: function(array, object) {
      var totalNumber = 0;
      
      _.each(array, function(thing){
        if (_.isEqual(thing, object)) totalNumber ++;
      })

      return totalNumber;
    },
    keysToKeyword: function (array) {
      
      if (_.isString(array)) return array;
      return  _.first(_.without(array, 'not', 'clear','condition'))
    },
    beginsWithNumber: function (string) {
      return _.isNumber(_.first(string));
    },
    compoundToObject: function (string) {

      var returnObj = {};
      returnObj.isValid = true;
      returnObj.target = string.split('|')[1];
      returnObj.attribute = string.split('|')[0];

      returnObj.target = returnObj.target || string;

      return returnObj;
    }
    
  })