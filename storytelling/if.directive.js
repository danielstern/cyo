define(['app'] , function (app) {
  app.directive('condition', ['eventService', function (es, $compile, $http) {
    return {
      restrict: 'E',
      scope: {
        page:'=',
      },
     
      link: function (scope, elem, attrs) {
         var whatHappened = _.keys(attrs.$attr);
         var itHappened = es.didThisHappen(whatHappened);

         if(!itHappened) {
          elem.addClass('hidden');
          // todo- invalidate events
          var events = elem.find('event');
          console.log("events?",events);
          events.addClass('cancelled');
         }
      },
    }
  }]);
})