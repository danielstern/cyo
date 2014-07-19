angular.module("cyo", [])

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

.directive("choice", function() {
    return {
        restrict: "EAC",
        // scope: "=",
        controller: "ChoiceController",
    }
})

// .directive("event", function() {
//     return {
//         restrict: "EA",
//         scope: true,
//         controller: "EventController",
//     }
// })

// .directive("condition", function() {
//     return {
//         restrict: "EA",
//         controller: "ConditionController",
//     }
// })


.controller("StoryController", function($scope, $element) {
    $scope.storyEvents = [];
    $scope.choices = [];
    $scope.decisions = ['intro'];
})

.controller("PageController", function($scope, $attrs, $element) {

    var pageName = Object.keys($attrs.$attr)[0];
    $scope.localEvents = {};
    $scope.localConditions = {};
    $scope.isComplete = false;

    $scope.$watch("decisions", function() {
        if ($scope.decisions.indexOf(pageName) > -1) {
            $element.attr("style", "display:block");
            for (_event in $scope.localEvents) {
                $scope.localEvents[_event].activate();
            }
        }
    }, true);
})

.controller("ChoiceController", function($scope, $attrs, $element) {
    var choiceName = Object.keys($attrs.$attr)[0];

    angular.element($element).on("click", function() {
        $scope.isComplete = true;
        $scope.decisions.push(choiceName);
        $scope.$apply();
    });

    $scope.$watch("isComplete", function() {
        if ($scope.isComplete) {
            $element.attr("style", "display:none");
        }
    }, true);
})
