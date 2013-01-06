//Code for toggling the aside tag of the design
(function(){
                $(document).ready(function(){
                    $('#m-aside').css('min-height', $('#page').height());
                    
                    $('#m-header button').toggle(function(){
                        $('#page').animate({
                            'left': 260
                        }, 200);
                        
                        $('#m-aside').animate({
                            'left': 0
                        }, 200);
                        
                    }, function(){
                        $('#page').animate({
                            'left': 0
                        }, 200);
                        
                        $('#m-aside').animate({
                            'left': -260
                        }, 200);
                    });
                });
            })();
			
//Start listener for the position coordinates when the device is ready
document.addEventListener("deviceready", onDeviceReady, false);

    var watchID = null;
    var a=0;

    // PhoneGap is ready
    //
    function onDeviceReady() {
        // Update every 3 seconds
       var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true  };
       //var options = { frequency: 3000 };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
    	a=a+1;
        var element = document.getElementById('geolocation');
        element.innerHTML =a + ': <br/>Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	
	
	///////////////////////another code to get current position coordinate
	// jQuery(window).ready(function(){  
				// jQuery("#btnInit").click(initiate_geolocation);  
			// });  
			// function initiate_geolocation() {  
				// navigator.geolocation.getCurrentPosition(handle_geolocation_query);  
			// }  
			// function handle_geolocation_query(position)  {	  
				// var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +  
                        // position.coords.longitude + "&zoom=10&size=430x120&markers=color:blue|label:S|" +  
                        // position.coords.latitude + ',' + position.coords.longitude;  
                        
                       // http://maps.googleapis.com/maps/api/geocode/json?latlng=50.7492094,7.098343099999999&sensor=false
                        
                        // document.getElementById("geolocation").innerHTML="Your latitude: " + position.coords.latitude + "<br/>Your longitude : " + position.coords.longitude;
                        // document.getElementById("locationmap").innerHTML="<img style='' src='"+image_url+"' width='430' height='120'/>";
                        // getlocinfo(position.coords.latitude,position.coords.longitude);
				// jQuery("#map").remove();  
				
							// jQuery(document.body).append(  
						// jQuery(document.createElement("img")).attr("src", image_url).attr('id','map'));  
			// }  