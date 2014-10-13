	
	var Typeahead = function Typeahead() {
	
		this.list = []; // list of objects like: { name:"", id:"" }
		this.setDataList = function(data) {
			console.log('typeahead setDataList');
			this.list = data;
			for(var i = 0; i < this.list.length; i++) {
                    	this.list[i].name;
                    	console.log(this.list[i].name);
                   }
			// set the list to a list of name,id pairs
			// then sort it by fullname A-Z 
		}
	
		this.search = function(key, cb) {
			// given a key, make it lowercase, seperate it into an 
			// array ofdistinct words by spaces and compare it to the 
			// lowercase version of each name, if all sub-keys are
			// present as the prefixes in the name add the pair to the 
			// subset returned to the callback
	
			// ex: key: "oT S" -> keys: ["to","s"]
			// matches	{name:"Otto Sipe", id: "12345"}
		}
	}
