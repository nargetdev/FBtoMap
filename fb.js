
var Facebook = function(map, view, callback) {

	this.login = function() {
		console.log('facebook login');
		// login a user and call callback() if successfull
		// be sure to provide appropriate {scopes: "scopes,go,here"}
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function(response) {
				console.log('Good to see you, ' + response.name + '.');
			});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});
		// view.showLogout();
		callback();
		
	}

	this.logout = function() {
		console.log('facebook logout');
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
		console.log("facebook getFriends");
		FB.api('/me/taggable_friends', function(response) {
                    for(var i = 0; i < response.data.length; i++) {
                    	list.push({
                    		name: response.data[i].name,
                    		id: response.data[i].id,
                    		picture: response.data[i].picture.data.url
                    	});
                    }
                    //console.log(cb);
                    cb(list);
		});
	}

	var count = 0;
	this.passToMap = function(response) {
		// helper function for the search
		// pulls out anything with a place
		// call map.addPoint(point)
		// be sure to make the time: new Date("time_string")
	}

	this.init = function() {
		console.log('facebook.init');
		/* provided FB init code, don't need to touch much at all*/

		var that = this; // note this usefull trick!
		window.fbAsyncInit = function() {
	
			// init the FB JS SDK
			FB.init({
				appId      : '550842745047551',	// App ID from the app dashboard
				channelUrl : '/channel.html', 	// Channel file for x-domain comms
				status     : true,				// Check Facebook Login status
				xfbml      : true,				// Look for social plugins on the page
				version    : 'v2.0',
				cookie     : true,
				oauth      : true
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


