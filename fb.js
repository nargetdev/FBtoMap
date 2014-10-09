
var Facebook = function(map, view, callback) {

	this.login = function() {
		// login a user and call callback() if successfull
		// be sure to provide appropriate {scopes: "scopes,go,here"}
	}

	this.logout = function() {
		// log the user out, remember the buttons!
	}

	this.getFriends = function(cb) {
		// return a list of the user and user's friends as 
		// an argument to cb, be sure to add the logged 
		// in fb user too! 
		// returns somethin like cb([{name:"",id:""},...]);
	}

	var count = 0;
	this.passToMap = function(response) {
		// helper function for the search
		// pulls out anything with a place
		// call map.addPoint(point)
		// be sure to make the time: new Date("time_string")
	}

	this.search = function (id) {
		// get "photos" and "statuses" with places attached
		// pass the data to the map with map.passToMap({...})
		// after *all* two API calls have returned, call map.renderAllPoints()
		// yay! async :) 

		// be sure your scopes are right during login
		// example: FB.api(id+"/photos?fields=place.fields(location,name)&limit=1000", this.passToMap);
		// use developers.facebook.com/tools/explorer to test!

		// hint, what should the user see while they wait?
	}

	this.init = function() {

		/* provided FB init code, don't need to touch much at all*/

		var that = this; // note this usefull trick!
		window.fbAsyncInit = function() {
	
			// init the FB JS SDK
			FB.init({
				appId      : '550842745047551',	// App ID from the app dashboard
				channelUrl : '/channel.html', 	// Channel file for x-domain comms
				status     : true,				// Check Facebook Login status
				xfbml      : true				// Look for social plugins on the page
			});

			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					// the user is logged in and has authenticated
					callback(); // we'll give you this one

				} else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook, 
					// but has not authenticated your app
				} else {
					// the user isn't logged in to Facebook.
				}
			});
		};

		// Load the SDK asynchronously - ignore this Magic!
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}	

	this.init();
}


