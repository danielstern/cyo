define(['app'] , function (app) {
  app.directive('condition', ['eventService', function (es, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page:'=',
      },
      template:function(a,b){
        return "<hidden-event-inspector/>";
    },
      link: function (scope, elem, attrs) {
          var whatHappened = _.keys(attrs.$attr);
         // es.somethingHappened(whatHappened);
         var isConditionTrue = es.didThisHappen(whatHappened);
         console.log("IF found:",whatHappened,isConditionTrue);
      },
    }
  }]);
})