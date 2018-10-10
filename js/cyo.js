angular.module("cyo", [])

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


.controller("StoryController", function($scope, $element) {

    $scope.storyEvents = [];
    $scope.choices = [];
    $scope.pages = [];
    $scope.completedPages = [];
    $scope.decisions = ['intro'];

    // $scope. = function() {
    // console.log("Init story...");
    // }

    // $scope.

    // $scope.init();
})

.controller("PageController", function($scope, $attrs, $element) {

    if ($scope.pages.length) {
        $element.css("display", "none");
    } else {
        $scope.isFirstPage = true;
    }

    var pageName = Object.keys($attrs.$attr);
    if (pageName[0] == "page") pageName.shift();

    $scope.pageName = pageName[0];

    $scope.pages.push(pageName[0]);

    // $scope.isComplete = false;

    $scope.$watch("decisions", function() {
        if ($scope.decisions.indexOf($scope.pageName) > -1) {
            $element.css("display", "block");
        } else if (!$scope.isFirstPage) {
            $element.css("display", "none");
        }
    }, true);
})

.controller("ChoiceController", function($scope, $attrs, $element) {

    var choiceName = Object.keys($attrs.$attr);
    if (choiceName[0] === "choice") choiceName.shift();

    angular.element($element).on("click", function() {
        $scope.completedPages.push($scope.pageName);
        $scope.decisions.push(choiceName[0]);
        $scope.$apply();
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


.controller("EventController", function($scope, $attrs) {
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

        console.info("Activating this event", storyEvent, !isNegative);

        if (!isNegative) {
            $scope.storyEvents.push(storyEvent[0]);
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
