	
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

			for(var i = 0; i < list.length; i++)
			{
				var name = list[i].name;
				name = name.toLowerCase();
				var names = name.split(" ");

				// console.log("Names:");
				// console.log(names);

				if(keys.length > names.length)
				{
					//Do not show this in the lookahead. If the user typed 'a b c' and the 
					//person has only a first and last name there is no way they can match.
					continue;
				}
				else
				{
					for(var j = 0; j < keys.length; j++)
					{
						// matches[j] = [];

						for(var k = 0; k < names.length; k++)
						{
							if(names[k].indexOf(keys[j]) == 0) 
							{
								//matches[j].push(k);
							}
						}
					}
					//For now pushes all values into the result set.
					result.push(list[i]);
				}
			}

			cb(result);
		}
	}
