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
    	console.log("Keys to keywords...",array)
    	if (_.isString(array)) return array;
    	return	_.first(_.without(array, 'not', 'clear','condition'))
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
});