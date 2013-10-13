define(['underscore'], function (_) {
  _.mixin({
    count: function(array, object) {
    	var totalNumber = 0;
      
      _.each(array, function(thing){
      	if (_.isEqual(thing, object)) totalNumber ++;
      })

      return totalNumber;
    },
    keysToKeyword: function (array) {
    	return	_.first(_.without(array, 'not', 'clear','condition'))
    },
    beginsWithNumber: function (string) {
    	return _.isNumber(_.first(string));
    },
    compoundToObject: function (string) {
    	var returnObj = {};
    	returnObj.target = string.split('|')[1];
			returnObj.attribute = string.split('|')[0];

			return returnObj;
    }
    
  })
});