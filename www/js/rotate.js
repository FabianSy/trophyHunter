jQuery(window).ready(function(){  
	jQuery('#btnBearing').click(computeBearing);
	
	// Update compass every 3 seconds
    var options = { frequency: 3000 };

	
	var watchID = navigator.compass.watchHeading(updateArrow, onError, options)
});

function updateArrow(heading) {
	brng = computeBearing();
	direction = heading - bearing;
	$('#result').html('Bearing: ' + brng + ' deg</br>Heading: ' + heading + ' deg');
	$('#arrow').rotate(brng);
}

// onError: Failed to get the heading
//
function onError(compassError) {
	alert('Compass error: ' + compassError.code);
}


Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
   return this * 180 / Math.PI;
}

function computeBearing(){

var lat1 = 50.77;
var lat2 = 50.73;
var lon1 = 6.09;
var lon2 = 7.1;

var dLon = lon2 - lon1;

var y = Math.sin(dLon) * Math.cos(lat2);
var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
var brng = Math.atan2(y, x).toDeg();

return brng;
}