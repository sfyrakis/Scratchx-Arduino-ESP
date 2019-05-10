(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    var output = '';
    var filler = '';
    var pop = '';
    var area = '';
    var request_option = '?fullText=true';
    //var url_beginning = 'https://restcountries.eu/rest/v1/name/';
	//var test1 = "https://ghibliapi.herokuapp.com/films";
	var test1="https://raw.githubusercontent.com/sfyrakis/test2/master/greece.json";

	
    ext.ArduinoURL = function(location) {
        //window.open(location, '_blank');
		url_beginning =location;
    };
	
    ext.getInfo = function(option, country, callback) {
 	  //alert("1");	
      var fullNameRequest = new XMLHttpRequest();
	  //alert("2");
      fullNameRequest.onreadystatechange = function() {
        if (fullNameRequest.readyState === XMLHttpRequest.DONE) {
          var fullNameText = fullNameRequest.responseText;
		  alert(fullNameText);
          try {
            switch (option) {
              case 'Capital':      output = JSON.parse(fullNameText)[0].capital;         break;
              case 'Region':       output = JSON.parse(fullNameText)[0].region;          break;
              case 'Sub-Region':   output = JSON.parse(fullNameText)[0].subregion;       break;
              case 'Native Name':  output = JSON.parse(fullNameText)[0].nativeName;      break;
              case 'Calling Code': output = JSON.parse(fullNameText)[0].callingCodes[0]; break;
            }
            if (output === '' || output == ' ') {
              output = 'This country has no ' + option + '.';
            }
            callback(output);
            output = '';
            filler = '';
          } catch (e) {
			   output = 'This country has no ' + option + '.';
               alert("Error!!!");
			   callback(output);
          }
        }
      };
	  //alert(test1);
      //fullNameRequest.open("GET", url_beginning + country + request_option);
	  fullNameRequest.open("GET", url_beginning,true);
	  //alert(url_beginning + country + request_option);
      fullNameRequest.send();
    };

	
    ext.get_ajax_data = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
		//alert("temperature 1");

		$.ajax({
			//setup https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en
	         //url: 'https://raw.githubusercontent.com/sfyrakis/test2/master/greece.json',
			 //url: "http://nominatim.openstreetmap.org/search/",
			 //url: 'https://api.wheretheiss.at/v1/satellites/255440',
			 //url: 'https://restcountries.eu/rest/v1/name/greece',
             url: 'https://localhost/test/greece.json',
             type: "GET",
             dataType: 'json',
			 /*
	         headers: {
                 'Access-Control-Allow-Credentials' : true,
                 'Access-Control-Allow-Origin':'*',
                 'Access-Control-Allow-Methods':'GET'
             },*/
            //crossDomain: true,
            //contentType: "application/json",
	        //async: false,
            cache: true,
            success: function (data, status, error) {
				capital = data[0]['capital'];
				console.log('success', data);
	  		    console.log("OK !!!");
				//alert("temperature OK");
				callback(capital);
			},
			error: function (data, status, error) {
				console.log('error', data, status, error);
	  	        console.log("Error !!!");
				//alert("temperature 2");
				callback("Error !!!");
			}
		});
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'open Arduino URL %s', 'ArduinoURL', 'https://raw.githubusercontent.com/sfyrakis/test2/master/greece.json'],
		  ['R', '%m.option_input of %s', 'getInfo', 'Capital', 'Afghanistan'],
		  ['R', 'current temperature in city %s', 'get_ajax_data', 'Boston, MA']
        ],
        menus: {
          option_input: ['Calling Code', 'Capital', 'Native Name', 'Region', 'Sub-Region']
        },
        url: 'http://nathanfi.github.io/ScratchX/CountryInfo/README.md'
    };

    // Register the extension
    ScratchExtensions.register('Web Arduino', descriptor, ext);
})({});
