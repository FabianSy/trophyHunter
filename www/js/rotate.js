jQuery(window).ready(function(){  
	jQuery('#btnBearing').click(computeBearing);
});

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

$('#result').html('Bearing: ' + brng + ' deg');
$('#arrow').rotate(brng);

}