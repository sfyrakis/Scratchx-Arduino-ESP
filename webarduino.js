(function(ext) {
    var output = '';

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    ext.Put_Ajax_Data = function(location, MyNameVar, MyValue, callback) {
        if(location=="")
			if(url_beginning!="")
				location=url_beginning;
			else
				callback("Error URL!!!");
				
        $.ajax({
           url: location,
           type: 'GET',
		   dataType: "json",
           data: MyNameVar+"="+MyValue,
           success: function(data) {
                //alert('Load was performed.');
				//console.log("url:"+url);  
				callback(1);
           },
		   error: function (data, status, error) {
				console.log('error', data, status, error);
	  	        console.log("Error !!!");
				alert("setup Chrome https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en");
				callback("Error URL!!!");
				
		   }
        });
		//window.open(url, '_blank');
		//console.log("url:"+url);                                                    
    };
	
    ext.ArduinoURL = function(location) {
        //window.open(location, '_blank');
		url_beginning =location;
    };
		

	
    ext.Get_Ajax_Data = function(location, MyNameVar, callback) {
        if(location=="")
			if(url_beginning!="")
				location=url_beginning;
			else
				callback("Error URL!!!");
				
		
		$.ajax({
			 url: location,
             type: "GET",
             dataType: 'json',
             cache: true,
             success: function (data, status, error) {
				output = data[0][MyNameVar];
				console.log('success', data);
				callback(output);
			 },
			 error: function (data, status, error) {
				console.log('error', data, status, error);
	  	        console.log("Error !!!");
				alert("setup Chrome https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=en");
				callback("Error !!!");
			 }
		});
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          [' ', 'Open Arduino URL %s', 'ArduinoURL', 'http://10.0.0.179/'],
		  ['w', 'Send Arduino URL %s Variable %s %m.option_put', 'Put_Ajax_Data', 'http://10.0.0.179/','5','on'],
		  ['R', 'Get  Arduino URL %s Variable %s', 'Get_Ajax_Data', '', 'A0']
        ],
        menus: {
		  option_put: ['on', 'off']
        },
        url: 'http://www.sfyrakis.gr/esp/README.md'
    };

    // Register the extension
    ScratchExtensions.register('Web Arduino', descriptor, ext);
})({});
