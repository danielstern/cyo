define(['app'] , function (app) {
	app.service('eventService', function() {

		this.allThingsPassed = [];
		window.atp = this.allThingsPassed;
		this.somethingHappened = function(thing) {
			console.log("Event logged...",thing);
			this.allThingsPassed = this.allThingsPassed.concat(thing);
		}

		this.didThisHappen = function(thing) {

			if (_.isArray(thing)) {
				thing = _.first(_.without(thing, 'not', 'clear'))
			}

			if (_.isNumber(_.first(thing))) {
				var reqNum = thing.split('|')[0];
				var thingString = thing.split('|')[1];
				
				if (_.count(this.allThingsPassed, thingString) >= reqNum) {
					return true;
				}
			}

			if (_.contains(this.allThingsPassed, thing)) return true;
			return false;
		}

		this.itDidNotHappen = function(thing) {

			this.allThingsPassed = _.without(this.allThingsPassed, thing);
		}
	});
})
