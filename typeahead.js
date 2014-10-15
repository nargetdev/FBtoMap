	
	var Typeahead = function Typeahead() {
	
		this.list = []; // list of objects like: { name:"", id:"" }

		this.setDataList = function(data) {
			// set the list to a list of name,id pairs
			// then sort it by fullname A-Z 

			console.log('typeahead -> setDataList');

			//Sorts the list using a lexographic comparator function.
			list = data;
            list.sort(function(a, b) {
            	return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
            });
		}
	
		this.search = function(key, cb) {
			console.log("typeahead -> search");
			// given a key, make it lowercase, seperate it into an 
			// array ofdistinct words by spaces and compare it to the 
			// lowercase version of each name, if all sub-keys are
			// present as the prefixes in the name add the pair to the 
			// subset returned to the callback
	
			// ex: key: "oT S" -> keys: ["ot","s"]
			// matches	{name:"Otto Sipe", id: "12345"}

			var result = []; 	//Stores the result set of names that match the key.
			//var matches = []; 	//Stores which name each word in key matches with.

			key = key.toLowerCase();
			var keys = key.split(" ");

			console.log("Keys:");
			console.log(keys);

			var soHelpMeGod = function(keys, names)
			{
				// console.log("typehead->search->soHelpMeGod");
				for(var j = 0; j < keys.length; j++)
				{
					// console.log(j);
					for(var k = 0; k < names.length; k++)
					{
						// console.log(k);
						if(names[k].indexOf(keys[j]) == 0) 
						{
							// console.log("broke");
							break;
						}
						if (k == names.length-1){
							// console.log("returned false");
							return false;
						}
					} // checked all names for key k
				} // checked all names for all keys
				// at this point we can we know that every key had a valid match
				return true;
			}

			console.log("Names:");
			for(var i = 0; i < list.length; i++)
			{
				var name = list[i].name;
				name = name.toLowerCase();
				var names = name.split(" ");


				console.log(names);

				var goodtitbadtit = soHelpMeGod(keys, names);
				// console.log(goodtitbadtit);

				if (goodtitbadtit) result.push(list[i]);

				// }//esle
			}

			cb(result);
		}
	}
