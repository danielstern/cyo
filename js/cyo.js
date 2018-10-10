angular.module("cyo", [])

//only if you are using >angularjs >1.5 components
//export default angular.module('cyo', [])

    .directive("story", function() {
      return {
        restrict: "EA",
        scope: true,
        controller: "StoryController",
      }
    })

    .directive("page", function() {
      return {
        restrict: "EA",
        scope: true,
        controller: "PageController",
      }
    })

    .directive("choice", function() {
      return {
        restrict: "EAC",
        controller: "ChoiceController",
      }
    })

    .directive("event", function() {
      return {
        restrict: "EA",
        // scope: true,
        controller: "EventController",
      }
    })

    .directive("condition", function() {
      return {
        restrict: "EA",
        controller: "ConditionController",
      }
    })

    .directive("restart", function() {
      return {
        restrict: "EA",
        scope: true,
        controller: "RestartController",
      }
    })

    .controller("StoryController", function($scope, $element, $localStorage) {
      $scope.storyEvents = [];
      $scope.choices = [];
      $scope.pages = [];
      $scope.completedPages = [];
      $scope.decisions = ['intro'];

      if($localStorage.get("storyEvents") != null){
        $scope.storyEvents = JSON.parse($localStorage.get("storyEvents"));
      }
      if($localStorage.get("completedPages") != null){
        $scope.completedPages = JSON.parse($localStorage.get("completedPages"));
      }
      if($localStorage.get("decisions") != null){
        $scope.decisions = JSON.parse($localStorage.get("decisions"));
      }
    })

    .controller("PageController", function($scope, $attrs, $element, $localStorage) {

      if ($scope.pages.length) {
        $element.css("display", "none");
      } else {
        $scope.isFirstPage = true;
      }

      var pageName = Object.keys($attrs.$attr);
      if (pageName[0] == "page") pageName.shift();

      $scope.pageName = pageName[0];
      $scope.pages.push(pageName[0]);

      $scope.$watch("decisions", function() {
        if ($scope.decisions.indexOf($scope.pageName) > -1) {
          $element.css("display", "block");
        } else if (!$scope.isFirstPage) {
          $element.css("display", "none");
        }
      }, true);
    })

    .controller("ChoiceController", function($scope, $attrs, $element, $localStorage,$anchorScroll,$location) {

      var choiceName = Object.keys($attrs.$attr);
      if (choiceName[0] === "choice") choiceName.shift();

      angular.element($element).on("click", function() {

        $scope.completedPages.push($scope.pageName);
        $scope.decisions.push(choiceName[0]);

        $scope.$apply();


        $localStorage.put("completedPages",JSON.stringify($scope.completedPages));
        $localStorage.put("decisions",JSON.stringify($scope.decisions));

        //Go to the bottom of the history
        //if <a id="bottom-scroll" name="bottom"></a> is in the bottom of the history
        //$location.hash('bottom');
        //$anchorScroll();
      });

      $scope.$watch("pages", function() {
        if ($scope.pages.indexOf(choiceName[0]) == -1) {
          console.error("A choice has no corresponding page,", choiceName[0]);
          $element.css("border", "2px solid red");
          $element.css("pointer-events", "none");
        }
      }, true);

      $scope.$watch("completedPages", function() {
        if ($scope.completedPages.indexOf($scope.pageName) > -1) {
          $element.css("display", "none");
        } else {
          $element.css("display", "inline-block");
        }
      }, true)
    })

    .controller("RestartController", function($scope, $attrs, $element) {
      angular.element($element).on("click", function() {
        [$scope.storyEvents, $scope.decisions, $scope.completedPages].forEach(function(A) {
          while (A.length > 0) {
            A.pop();
          }
        });

        $scope.$apply();
      });
    })


    .controller("EventController", function($scope, $attrs, $localStorage) {
      var storyEvent = Object.keys($attrs.$attr);
      var isNegative = false;
      if (storyEvent[0] === "clear") {
        isNegative = true;
        storyEvent.shift();
      };

      var activated = false;

      function activate() {
        if (activated) return;
        activated = true;
        if ($scope.isCondition && !$scope.conditionValid) {
          return;
        };

        console.info("Activating this event", storyEvent[0], !isNegative);

        if (!isNegative) {
          $scope.storyEvents.push((storyEvent[0]));
          $localStorage.put("storyEvents",JSON.stringify($scope.storyEvents));
        } else {
          var index = $scope.storyEvents.indexOf(storyEvent[0]);
          $scope.storyEvents.splice(index, 1);
        };

      }

      $scope.$watch("decisions", function() {
        if ($scope.decisions.indexOf($scope.pageName) > -1) {
          activate();
        } else {
          activated = false;
        }
      }, true);
    })

    .controller("ConditionController", function($scope, $element, $attrs) {
      $element.css("display", "none");
      var condition = Object.keys($attrs.$attr);
      var isNegative = false;
      var activated = false;
      $scope.isCondition = true;

      if (condition[0] === "unless" || condition[0] === "not") {
        isNegative = true;
        condition.shift();
      };

      function activate() {
        if (activated) return;
        activated = true;
        if ($scope.storyEvents.indexOf(condition[0]) > -1 && !isNegative) {
          $scope.conditionValid = true;
          $element.css("display", "block");
        } else if ($scope.storyEvents.indexOf(condition[0]) == -1 && isNegative) {
          $scope.conditionValid = true;
          $element.css("display", "block");
        }
      }

      $scope.$watch("decisions", function() {
        if ($scope.decisions.indexOf($scope.pageName) > -1) {
          activate();
        } else {
          activated = false;
          $element.css("display", "none");
        }
      }, true);
    });

//only if you are using >angularjs >1.5 components
//.name


