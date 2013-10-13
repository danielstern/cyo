define(['app'] , function (app) {
	app.service('eventService', function() {

		this.allThingsPassed = [];
		window.atp = this.allThingsPassed;

		this.somethingHappened = function(thing) {
			this.allThingsPassed = this.allThingsPassed.concat(thing);
		}

		this.conditionToValidity = function(condition, getNeg) {

			var conditionStatement;
			var itHappened = false;

			//if (_.isArray(condition)) conditionStatement = _.keysToKeyword(condition);
			conditionStatement = _.compoundToObject(condition).target;
			//conditionStatement = conditionStatement || condition;

			if (_.beginsWithNumber(conditionStatement)) {
				var data = _.compoundToObject(conditionStatement);
				if (_.count(this.allThingsPassed, data.target) >= data.attribute) itHappened = true;
			}


			if (_.contains(this.allThingsPassed, conditionStatement)) itHappened = true;

	//		console.log("Conditiontovalidity...",conditionStatement,this.allThingsPassed);

			return (getNeg) ? !itHappened : itHappened;

		}

		this.didThisHappen = function(thing) {

			if (_.isArray(thing)) thing = _.keysToKeyword(thing);

			if (_.beginsWithNumber(thing)) {
				var data = _.compoundToObject(thing);
				if (_.count(this.allThingsPassed, data.target) >= data.attribute) return true;
			}

			if (_.contains(this.allThingsPassed, thing)) return true;

			return false;
		}

		this.itDidNotHappen = function(thing) {
			this.allThingsPassed = _.without(this.allThingsPassed, thing);
		}
	});
})
