
var Facebook = function(map, view, callback) {

	var that = this; //Note this useful trick!

	this.login = function() {

		console.log('fb -> login');
		// login a user and call callback() if successfull
		// be sure to provide appropriate {scopes: "scopes,go,here"}
		// get "photos" and "statuses" with places attached
		// pass the data to the map with map.passToMap({...})
		// after *all* two API calls have returned, call map.renderAllPoints()
		// yay! async :) 

		// be sure your scopes are right during login
		// example: FB.api(id+"/photos?fields=place.fields(location,name)&limit=1000", this.passToMap);
		// use developers.facebook.com/tools/explorer to test!

		// hint, what should the user see while they wait?
		view.showSpinner();
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me/photos?fields=place.fields(location,name)&limit=1000', that.passToMap);
				callback();
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});


	}

	this.logout = function() {
		console.log('fb -> logout');
		// log the user out, remember the buttons!
		FB.logout(function(){document.location.reload();});
		view.showLogin();
	}

	this.getFriends = function(cb) {
		// return a list of the user and user's friends as 
		// an argument to cb, be sure to add the logged 
		// in fb user too! 
		// returns somethin like cb([{name:"",id:""},...]);
		var list = [];
		console.log("fb -> getFriends");
		
		FB.api('/me/taggable_friends', function(response) {

            for(var i = 0; i < response.data.length; i++) {
            	list.push({
            		name: response.data[i].name,
            		id: response.data[i].id,
            		picture: response.data[i].picture.data.url
            	});
            }
            cb(list);
		});
	}

	var count = 0;
	this.passToMap = function(response) {
		// helper function for the search
		// pulls out anything with a place
		// call map.addPoint(point)
		// be sure to make the time: new Date("time_string")
		console.log("fb -> passToMap");
		console.log(response.data[0].link);
		console.log(response.data[0].picture);

		for(var i = 0; i < response.data.length; i++)
		{
			if(!(typeof response.data[i].place === 'undefined'))
			{

				var point = {
					lat:response.data[i].place.location.latitude, 
					lng:response.data[i].place.location.longitude, 
					name:response.data[i].place.name, 
					time: new Date(response.data[i].created_time),
					picurl:response.data[i].picture,
					link:response.data[i].link
				}
				console.log(response.data[i].picture)
				map.addPoint(point);
			}
		}

		//After adding all points, renders them on the map all at once.
		map.renderAllPoints();
	}

	this.init = function() {
		console.log('fb -> init');
		/* provided FB init code, don't need to touch much at all*/

		var that = this; // note this usefull trick!
		window.fbAsyncInit = function() {
	
			// init the FB JS SDK
			FB.init({
				appId      : '300831163443482',	// App ID from the app dashboard
				channelUrl : '/channel.html', 	// Channel file for x-domain comms
				status     : true,				// Check Facebook Login status
				xfbml      : true,				// Look for social plugins on the page
				version    : 'v2.1',
				cookie     : true,
				oauth      : true
			});

			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					// the user is logged in and has authenticated
					view.showSpinner();
					FB.api('me/photos?fields=picture,link,place.fields(location,name)&limit=1000', that.passToMap);
					callback(); // we'll give you this one
				} 
				else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook, 
					// but has not authenticated your app

				} 
				else {
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


