////////////////////////////////////////////////////////////////////////
/////////// jquery FUNC TO GET THE COORDINATE OF THE THE USER, THEN CALLING getlocinfo() TO SHOW THE USER POSITION INFO////////////
/////////////////////////////////////////////////////////////////////////
jQuery(window).ready(function(){  
				jQuery("#btnInit").click(initiate_geolocation);  
			});  
			function initiate_geolocation() {  
				navigator.geolocation.getCurrentPosition(handle_geolocation_query);  
			}  
			function handle_geolocation_query(position)  {	  
				var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +  
                        position.coords.longitude + "&zoom=10&size=430x120&markers=color:blue|label:S|" +  
                        position.coords.latitude + ',' + position.coords.longitude;  
                        
                        //http://maps.googleapis.com/maps/api/geocode/json?latlng=50.7492094,7.098343099999999&sensor=false
                        
                        //document.getElementById("myinfo").innerHTML="Your latitude: " + position.coords.latitude + "<br/>Your longitude : " + position.coords.longitude;
                        document.getElementById("locationmap").innerHTML="<img style='' src='"+image_url+"' width='430' height='120'/>";
                        getlocinfo(position.coords.latitude,position.coords.longitude);
				jQuery("#map").remove();  
				
							//jQuery(document.body).append(  
						//jQuery(document.createElement("img")).attr("src", image_url).attr('id','map'));  
			}  
//////////////////////////////////////////////////////////////////////////
function showQuestInfo(tourstr,cityName,LatValue,LongValue,imgsrc)
{

//alert("hi");
var htmlPage= "<br/><span class='lableText'>The following data have been saved as a new quest:</span><br/>";
htmlPage=htmlPage+ "<div style='width:90%;float:left;margin:10px;'>";
htmlPage=htmlPage+"<div><span class='lableText'>Quest Title:&nbsp;</span><span class='dataStyle' style='float:left;'>"+tourstr+"</span><br/>";
htmlPage=htmlPage+"<div><span class='lableText'>City Name:&nbsp;</span><span id='cityName' class='dataStyle'>"+cityName+"</span></div>";
htmlPage=htmlPage+"<div><span class='lableText'>Latitude:&nbsp;</span><span id='LatValue' class='dataStyle'>"+LatValue+"</span></div>";
htmlPage=htmlPage+"<div><span class='lableText'>Longitude:&nbsp;</span><span id='LongValue' class='dataStyle'>"+LongValue+"</span></div>";
htmlPage=htmlPage+"</div>";
htmlPage=htmlPage+"<div class='badgediv'>";
htmlPage=htmlPage+"<span class='lableText'>Badge&nbsp;&nbsp;</span>";
htmlPage=htmlPage+"<div style=' margin-top:2px; width:50px; float:left'><img id='img3' alt='' src='"+imgsrc+"' width='47' height='50'/></div>";
htmlPage=htmlPage+"</div>";

htmlPage=htmlPage+"<div><a href='javascript:;'><img id='btnShowQ' alt='' src='images/start.png' border='0' width='100' height='25' style='float: right' /></a>&nbsp;&nbsp;&nbsp;<span class='lableText'><a href='default.htm'>Back</a></span></div>";
document.getElementById("locationinfo").innerHTML=htmlPage;			
}

////////////////////////////////////////////////////////////////////////
/////////// FUNCTION TO SEND THE INFOS OF QUEST THAT THE USER WANNA TO ADD AND SEND IT TO ANOTHER FUUNCTION CALLED postQuestInfo() ////////////
/////////////////////////////////////////////////////////////////////////
function checkQuestInfo()
{
var tourstr=document.getElementById("touritle");
var cityName=document.getElementById("cityName").innerHTML;
var LatValue=document.getElementById("LatValue").innerHTML;
var LongValue=document.getElementById("LongValue").innerHTML;
var imgsrc = document.getElementById("img3").getAttribute('src');


if(tourstr.value.length>0){				
postQuestInfo(tourstr.value,cityName,LatValue,LongValue,imgsrc);
			
}
else{
alert("Please select a Title for this Quest!");
}
}


function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
{
// code for IE7+, Firefox, Chrome, Opera, Safari
return new XMLHttpRequest();
}
if (window.ActiveXObject)
{
// code for IE6, IE5
return new ActiveXObject("Microsoft.XMLHTTP");
}
return null;
}

////////////////////////////////////////////////////////////////////////
/////////// FUNCTION TO SEND LANGITUDE AND LATITUDE TO  readGoogleXml.php AND GET BACK THE CITYNAME AND OTHE RI NFOS ////////////
/////////////////////////////////////////////////////////////////////////
var xmlhttp
function getlocinfo(latitude,longtitude) { 
xmlhttp=GetXmlHttpObject();
if (xmlhttp==null)
{
alert ("Your browser does not support XMLHTTP!");
return;
}

//window.location.hash =str;
document.getElementById("loader").style.visibility = "visible";

var url="readGoogleXml.php";
url=url+"?lat="+latitude;
url=url+"&long="+longtitude;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=function()
{ 
if (xmlhttp.readyState==4)
{ 
document.getElementById("locationinfo").innerHTML=xmlhttp.responseText;
document.getElementById("loader").style.visibility = 'hidden';
}
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}
///////////////////////////////////////////////////////////////////////
//////////////////////////FUNCTION TO ADD NEW QUEST TO THE XML BY SEND PARAMS TO addquest.php///////////////////////////////////////
///////////////////////////////////////////////////////////////////////
function postQuestInfo(tourstr,cityName,LatValue,LongValue,imgsrc) { 
xmlhttp=GetXmlHttpObject();
if (xmlhttp==null)
{
alert ("Your browser does not support XMLHTTP!");
return;
}
var url="addquest.php";
url=url+"?title="+tourstr;
url=url+"&city="+cityName;
url=url+"&latitude="+LatValue;
url=url+"&longitude="+LongValue;
url=url+"&badgeurl="+imgsrc;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=function()
{ 
if (xmlhttp.readyState==4)
{ 
document.getElementById("locationinfo").innerHTML=xmlhttp.responseText;
//document.getElementById("locationinfo").innerHTML="<br/><span class='lableText'>The following data have been saved as a new quest:</span><br/>"+htmlPage;			
//document.getElementById("loader").style.visibility = 'hidden';
}
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}

////////////////////////////////////////////////////////////////////////
///////////////////////////  SHOW ALL QUEST /////////////////////////////
/////////////////////////////////////////////////////////////////////////

function showAllQuest() { 
xmlhttp=GetXmlHttpObject();
if (xmlhttp==null)
{
alert ("Your browser does not support XMLHTTP!");
return;
}

//window.location.hash =str;
document.getElementById("loader").style.visibility = "visible";

var url="showquest.php";
url=url+"?lat=1";
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=function()
{ 
if (xmlhttp.readyState==4)
{ 
document.getElementById("locationinfo").innerHTML=xmlhttp.responseText;
document.getElementById("loader").style.visibility = 'hidden';
}
}
xmlhttp.open("GET",url,true);
xmlhttp.send(null);
}


///////////////////////////////////////////////////////////////////////
///////////////////    AMAZON  SERVICE   (THIS FUNCTION DOESNT WORK, IT WAS JUST FOR TEST)//////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
function postdata()
{
//$.post("", { name: "locationTest2", latitude: "727.77", longitude: "828.88", radius: "200" } ); 
//xmlhttp=GetXmlHttpObject();
xmlhttp=XMLHttpRequest();
if (xmlhttp==null)
{
alert ("Your browser does not support XMLHTTP!");
return;
}

//window.location.hash =str;
document.getElementById("loader").style.visibility = "visible";

var url="http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080/TrophyHunterWebService/rest/createLocation";
url=url+"?title="+tourstr;
url=url+"&city="+cityName;
url=url+"&latitude="+LatValue;
url=url+"&longitude="+LongValue;
url=url+"&badgeurl="+imgsrc;
//url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=function()
{ 
if (xmlhttp.readyState==4)
{ 
document.getElementById("locationinfo").innerHTML=xmlhttp.responseText;
document.getElementById("loader").style.visibility = 'hidden';
}
}
xmlhttp.open("POST",url,true);
xmlhttp.send(null);
}
