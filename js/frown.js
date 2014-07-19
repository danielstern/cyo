angular.module("cyo",[])

.directive("story", function() {
        return {
            restrict: "EA",
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
    .directive("event", function() {
        return {
            restrict: "EA",
            scope: true,
            controller: "EventController",
        }
    })
    .directive("choice", function() {
        return {
            restrict: "EAC",
            // scope: "=",
            controller: "ChoiceController",
        }
    })
    .directive("condition", function() {
        return {
            restrict: "EA",
            controller: "ConditionController",
        }
    })


.controller("StoryController", function($scope, $element) {
    $scope.storyEvents = [];
    $scope.pages = [];
    $scope.choices = [];
    $scope.decisions = [];

    $scope.$watch("pages", function() {
        for (var title in $scope.pages) {
            var page = $scope.pages[title];
            if (title == "intro") page.show();
        }
    });

   
})

.controller("ConditionController", function($scope, $element, $attrs) {
    $element.attr("style", "display:none");
    var condition = Object.keys($attrs.$attr);
    var isNegative = false;

    this.activate = function() {
    	if (condition[0] === "unless" || condition[0] === "not") {
    	    condition.shift();
    	};
        $scope.storyEvents.forEach(function(storyEvent){
            // if (!storyEvent.isNegative && key == condition[0] || key != condition[0]) {
            //     console.log("revealing....", condition, isNegative, key);
            //     $element.attr("style", "display:block");
            // }
        });
    }

    // $scope.$watch('storyEvents', function() {
        
    // }, true);
})

.controller("PageController", function($scope, $attrs, $element) {

    var pageName = Object.keys($attrs.$attr)[0];
    $scope.localEvents = {};
    $scope.localConditions = {};

    $scope.pages[pageName] = this;

    $scope.$watch("decisions", function() {
        for (var choiceName in $scope.decisions) {
            if ('') {

            }
        }
    }, true);

    this.show = function() {
        $element.attr("style", "display:block");
        for (_event in $scope.localEvents) {
            $scope.localEvents[_event].activate();
        }
    };

    this.hide = function() {
        $element.attr("style", "display:none");
    };

    $scope.isComplete = false;

})

.controller("ChoiceController", function($scope, $attrs, $element) {
    var choiceName = Object.keys($attrs.$attr)[0];
    $scope.choices[choiceName] = choiceName;

    angular.element($element).on("click", function() {
        $scope.isComplete = true;
        $scope.decisions[choiceName] = choiceName;
        $scope.$apply();
    });

    $scope.$watch("isComplete", function() {
        if ($scope.isComplete) {
            console.log("I'm complete");
            $element.attr("style", "display:none");

        }
    }, true);
})

.controller("EventController", function($scope, $attrs) {
    var storyEvent = Object.keys($attrs.$attr);
    var isNegative = false;
    if (storyEvent[0] === "clear") {
        isNegative = true;
        storyEvent.shift();
    };

    $scope.localEvents[storyEvent] = this;

    this.activate = function() {
        if (!isNegative) {
            $scope.storyEvents[storyEvent] = this;
        } else {
            delete $scope.storyEvents[storyEvent];
        }
    }

})