
$(document).ready(function () {

	/* 
	Notes: 

	all jQuery $("selector") calls should be in this file,
	*don't* add them elsewhere. this will probably be the only
	file making a new Obj() too. if you're confused please
	ask a GSI - but be sure to read the docs first!!!

	show and hide the spinner when anything is loading.
	only show login or logout buttons - not both
	make sure the clear map function stops the current search
	don't let glitchy UI slide - you'll lose points!
	think in terms of callbacks! it will help you fix async problems

	sometimes jquery and bootstrap dont get along, if .hide() and .show()
	don't work right use: addClass("hide") or removeClass("hide")

	Lastly: We will grade everything on the latest version of Chrome,
	so dev with Chrome for gosh sake! Use the dev tools too they're
	amazing!
	*/

	var friendList = []; //For some reason typeahead.list was not rendering properly. Store this instead.
	var loggedIn = false;
	var map = new Map(this);
	var typeahead = new Typeahead();
	var that = this;
	var fb = new Facebook(map, this, function() {

		console.log('main -> fb = new Facebook()');

		//I think this needs to change to populate the list differently.
		fb.getFriends(typeahead.setDataList);
		loggedIn = true;
		that.showLogout();

		//initialize friendlist
		that.friendList = typeahead.list;
		console.log("typeahead.list is "+typeahead.list);
		// called on successful login
		// set typeahead data and show/hide buttons
	});


	// create dat spinner
	this.spinner = new Spinner({radius: 30, length: 30}).spin($("#spinner")[0]);
		
	this.setMiles = function(miles) {
		// update #miles_traveled div

		console.log("main -> setMiles");
		document.getElementById('miles_traveled').innerHTML = miles.prettyPrint();
	}

	this.setPic = function(user_id) {
		// set the src of the #user_img
		// check out http://graph.facebook.com/ottosipe/picture?type=large

		console.log("main -> setPic");

		for(var i = 0; i < friendList.length; i++)
  		{
  			if(friendList[i].id === user_id)
  			{
  				document.getElementById('user_img').src = friendList[i].picture;
  			}
  		}
	}

	this.showLogin = function() {
		// show and hide the right buttons
		$( "#login_bar :input[value='login']" ).removeClass("hide");
		$( "#login_bar :input[value='logout']" ).addClass("hide");
	}

	this.showLogout = function() {
	// show and hide the right buttons
		$( "#login_bar :input[value='login']" ).addClass("hide");
		$( "#login_bar :input[value='logout']" ).removeClass("hide");
	}

	this.showSpinner = function() {
		
		$("#spinner").removeClass("hide");
	}

	this.hideSpinner = function() {

		$("#spinner").addClass("hide");
	}
	

	/* 
	attach all of the buttons and key press events below here
	- .login(click)

	- .logout(click)

	- #user(keyup): use typeahead.search(key, callback)

	- the call back should render the .drop_items with IDs and Names
		- attach a .drop_item(click)
	 		- start the fb search, call fb.search(id)
	 		- reset and clear #search_dropdown

	- .clear(click): remove data and reset miles/image, other UI
	*/


	$( ".login" ).click(function() {
  		fb.login();
	});

	$( ".logout" ).click(function() {
  		fb.logout();
	});

	//initialize  NOTE this could cause trouble.
	//I've included it so that the index won't fail on the first iteration.
	// var stash_a_key = function(saveMe) {
	// 	var previous = saveMe;
	// }


	$("#user").keyup(function() {
		if(loggedIn) that.showSpinner();
  		var key = document.getElementById('user').value;

  		typeahead.search(key, function(result) {

  			console.log("keyup->callback"); 

  			friendList = result;

  			console.log("result");
  			console.log(result);

  			//Removes all elements in the dropdown list.
  			var node = document.getElementById('search_dropdown');
  			var length = node.childNodes.length;

			while (node.hasChildNodes()) {
			    node.removeChild(node.firstChild);
			}

			//Adds new elements to the dropdown list based on the typed in letters.
  			for(var i = 0; i < result.length; i++)
  			{
  				var div = document.getElementById('search_dropdown');
  				div.innerHTML = div.innerHTML + "<div class='drop_item' data-id='" 
  							  + result[i].id + "'>" + result[i].name + "</div>";
  			}

  			$("#search_dropdown").removeClass("hide");
  			if(loggedIn) that.hideSpinner();
  		});
	});

	$(document).on('click', '.drop_item', function() {

		console.log("clicked");
		var id = $(this).attr('data-id');
		that.setPic(id);
	});

	$( ".clear" ).click(function() {

		console.log('Clicked Clear');
		console.log('resetting friendlist');
		fb.getFriends(typeahead.setDataList);

	  	var node = document.getElementById('search_dropdown');
		while (node.hasChildNodes()) {
		    node.removeChild(node.firstChild);
		}

		document.getElementById('user_img').src = "";
		$("#search_dropdown").addClass("hide");

		//Is this needed???**
		//document.getElementById('miles_traveled').innerHTML = 0;
	});

});

