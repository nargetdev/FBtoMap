
	Number.prototype.toRad = function() {
		// convert an angle (in degrees) to radians
		return this.valueOf() * Math.PI / 180;
	}

	Number.prototype.prettyPrint = function() {
		// return a string representation of an integer
		// which has commas every three digits

		//***If this doesn't work we have to use regular expressions...

		var val = this.valueOf();
		val.toLocaleString();
		return val;
	};

	distanceFormula = function(first, second){
		// compute the distance in miles between two lat lng points
		// a point should look like {lat: 0.0, lng: 0.0}

		var R = 3963;
		//This is the radius of the earth in miles.

		if(!first || !second) return 0;

		var dLat = (second.lat - first.lat).toRad();
		var dLng = (second.lng - first.lng).toRad();
		var lat1 = first.lat.toRad();
		var lat2 = second.lat.toRad();

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d =  R * c;

		return d;
	};
