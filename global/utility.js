define(['underscore'], function (_) {
  _.mixin({
    count: function(array, object) {
    	var totalNumber = 0;
      
      _.each(array, function(thing){
      	if (_.isEqual(thing, object)) totalNumber ++;
      })

      return totalNumber;
    },
    
  })
});