/*
	hints:
	-implement the line with a google.maps.Polyline
	-let google redraw the polyline (see .getPath()) when a new
	point is added - don't delete the whole thing and add it again 
	-use google.maps.Marker for markers
	-use .setMap(null) do remove/delete either of these from your map
	you're making work for yourself if you do it any other way
*/

var Map = function Map(view) {

	var mapOptions = {
		// feel free to edit map options
		disableDefaultUI: true,
		zoom: 5,
		center: new google.maps.LatLng(39.50, -98.35),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	this.init = function() {
		// render map here
		console.log("map -> init");
		this.map = new google.maps.Map($('#map_canvas')[0], mapOptions);
	}

	this.points = []; // { lat:0.0, lng:0.0, name: "", time: Date() }
	this.markers = []; // array of markers already on map

	this.addPoint = function(point) {
		// adds a point to this.points
		console.log("map -> addPoint");
		this.points.push(point);
	}
	
	
	this.renderAllPoints = function () {
		// remove all old map data, *sort* the points
		// and render each point ever ~300ms
		// don't render the point if dist(this_pt,prev) === 0	
		//sort the points first

		console.log("map -> renderAllPoints");

		//Sorts the points by date.
		this.points.sort(function(a, b) {
            return ((a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0));
         });

		//Prints out sorted points on the map.
		console.log(this.points);

		//Finds the total distance between each of the paths
		//between two points in sequential order.
		var totalDistance = 0;
		for(var i = 0; i < this.points.length - 1; i++)
		{
			var dist = distanceFormula(this.points[i], this.points[i+1]);
			console.log(dist);
			totalDistance += dist;
		}
		view.setMiles(Math.round(totalDistance));


		//Adds polylines on the map.
		var coordinates = [];
		for(var i = 0; i < this.points.length; i++)
		{
			coordinates.push(new google.maps.LatLng(this.points[i].lat, this.points[i].lng));
		}
		var polyline = new google.maps.Polyline({

		    path: coordinates,
		    geodesic: true,
		    strokeColor: '#ffcb05',
		    strokeOpacity: 1.0,
		    strokeWeight: 4
	  	});


		//Adds markers on the map.
		for(var i = 0; i < polyline.getPath().getLength(); i++ ) 
		{
			var marker = new google.maps.Marker({

				position : polyline.getPath().getAt(i)
			});
			marker.setMap(this.map);
			//this.markers.push(marker);
		}
		polyline.setMap(this.map);
		view.hideSpinner();
	}

	this.removeData = function() {
		// reset distance, clear polypath and markers

		console.log("map -> removeData");

		// polyline.setMap(null);
		// for(var i = 0; i < markers.length; i++) 
		// {
		// 	markers[i].setMap(null);
		// }
	}

	this.renderSinglePoint = function(cb) {
		// render a single point on the map
		// pan the map to the new point
		// make sure to update the polypath
		// consider recursion :)
	}

	// call the initializer
	this.init();
}