define(['app'] , function (app) {
	app.service('eventService', function() {

		this.allThingsPassed = [];
		window.atp = this.allThingsPassed;

		this.somethingHappened = function(thing) {
			this.allThingsPassed = this.allThingsPassed.concat(thing);
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
