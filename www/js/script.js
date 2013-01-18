//Code for toggling the aside tag of the design
var togglechanged=false;
// (function(){
    // $(document).ready(function(){

// $("div.questbg").click(function () {
      // $(this).slideUp();
    // });    
// $('a.pageanimate').click(function(){    
        // $('img.pageanimate').click(function(){
            // if(togglechanged){
                // togglechanged=false;
                // $('#page').animate({left:'0px'});
                // $('#m-aside').animate({left:'-260px'});
                 // $("#createQuest").slideUp("slow");
            // }
            // else {
                // togglechanged=true;
                // $("#maincontent").
                // $('#page').animate({left:'260px'});
                // $('#m-aside').animate({left:'0px'});
            // }
        // });          
    // });
// })();
/////////////////////////////
////to load the content of the requested htlm page
/////////////////////////////
function loadPage(pageName)
{
	$('#maincontent').load(pageName);
}
///show 
$(document).ready(function(){
  $("#flipcreatQuest").click(function(){
    $("#createQuest").slideDown("slow");
     $("#maincontent").text('');
    
  });
});

////////////////////////////////
///// to show the clear img inside textbox
///////////////////////////////
$(document).ready(function() {
    $('input.deletable').wrap('<span class="deleteicon" />').after($('<span/>').click(function() {
        $(this).prev('input').val('').focus();
    }));
});
////////////////////////////////
///// clear the defualt value of the textbox
///////////////////////////////
function changeInputValue(inputId){
$("#"+inputId).val("");
}
/////////////////////////////////////////////////////////////////////////
///////2 functions to get current position coordinates 
////// and insert then to the html page
/////////////////////////////////////////////////////////////////////////
function createBasicQuest(){ 
navigator.geolocation.getCurrentPosition(show_lat_lang);
//var locationOptions = { maximumAge: 5000, enableHighAccuracy: true  };
//navigator.geolocation.watchPosition(show_lat_lang, onError, locationOptions);
}
function show_lat_lang(position)  {
//map1
var mapWidth=$("#showmap").width(); 
var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +  
position.coords.longitude + "&zoom=10&size="+mapWidth+"x120&markers=color:blue|label:S|" +  
position.coords.latitude + ',' + position.coords.longitude;
//map2
//var mapme = new google.maps.Map2(document.getElementById("showmap2"));
//mapme.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 12);
//markpos =position.coords.latitude+ ","+position.coords.longitude;
//alert(markpos);
//headMarker = new GMarker(markpos);
//mapme.addOverlay(headMarker);
///

document.getElementById("showmap").innerHTML="<img style='' src='"+image_url+"' width='"+mapWidth+"' height='120'/>";
document.getElementById("latValue").innerHTML=position.coords.latitude;
document.getElementById("longValue").innerHTML=position.coords.longitude; 
}
////////////////////////////////////////////
//////save the new quest to the online server
/////////////////////////////////////////////
function saveQuestInfo()
{

var questtitle=document.getElementById("questtitle").value;
questtitle = questtitle.split(' ').join('_'); //replace spaces with underscores

var descText = document.getElementById("descText").value;
descText=descText.split(' ').join('_'); //replace spaces with underscores

var imgsrc = document.getElementById("badgeImg").getAttribute('src');
var Qrad =30;
var latValue = document.getElementById("latValue").innerHTML;
var longValue = document.getElementById("longValue").innerHTML;
if(questtitle.length>0){
    
///send the data to the Amazon 
simpleCreateQuest(questtitle, descText, imgsrc, latValue, longValue, Qrad);
/////clear all data
document.getElementById("questtitle").value="";
document.getElementById("descText").value="";
document.getElementById("latValue").innerHTML="";
document.getElementById("longValue").innerHTML="";
$("#createQuest").slideUp(1000);
$("#maincontent").text('Your Quest has been created successfully :)');

}
else{
//alert("Please select a Title for this Quest!");
$("#maincontent").text('Please select a Title for this Quest!');
}
}

var completed ="";

function isSolved(questname){
	var solved=false;
	//alert(questname);
	for(var i=0;i<localStorage.length;i++){
		//alert(questname); not working
		if (questname == localStorage.getItem(localStorage.key(i))){
			//alert(questname);
			solved = true;
			return solved;
		}
		else{
		}
	}
	return solved;
}
/////////////////////////////////////////////////////////////////////////
///////Show all quests code in the page
/////////////////////////////////////////////////////////////////////////
function showAllQuests(){
    document.getElementById("sidebtn").style.visibility = 'visible';
    document.getElementById("backbtn").style.visibility = "hidden";
    //document.getElementById("sidebtn").style.display  = 'block';
    //document.getElementById("backbtn").style.display  = "none";
    var json = JSON.parse(getAllBasicQuests());
    var questsArray = json.basicQuest;
    var j =1;
    var htmlResult = "";
    htmlResult +="<div>";
    for(var i in questsArray){
        var DBQName="";
        var newQName="";
        var quest = questsArray[i];
		//alert(quest.name); works
		if(!isSolved(quest.name)){
						//alert('alert');
                        DBQName=quest.name;
                        newQName=DBQName.split('_').join(' ');
			htmlResult +=  "<div id='"+i+"' class='questbg" + j + "' onclick=javascript:showQuest('" + quest.name + "'," + j + ");><center><span class='getallquest'>" + newQName + "</span></center></div>";
			htmlResult +=  "<div style='height:2px;background: #EDEFF3'>&nbsp;</div>";
			j+=1;
			if (j>4){
                            j=1;
			}
		}
    } 
    htmlResult +="</div>";
    document.getElementById("maincontent").innerHTML=htmlResult;  
}
///////////////////////////////////////////////////////////////////
/////show the quest information in a seperated view
///////////////////////////////////////
var badgePath = "";
var questName = "";
function showQuest(questName,j){
    document.getElementById("sidebtn").style.visibility = 'hidden';
    document.getElementById("backbtn").style.visibility = "visible";
 
     
    var json = JSON.parse(getQuestByName(questName));
    console.log(json);
    badgePath = json.rewardedBadge.path;
	questName = json.name;
	completed = questName;
	//alert(completed); works
    var htmlPage="";        
    htmlPage+="<div id='showresult' style='margin-bottom:5px'></div>";  
    htmlPage+="<div class='questinfobg' style=' height: 150px;'><div style='color:#ffffff;margin:5px'>";
    htmlPage+="name: "+json.name+"<br/>";
    htmlPage+="targetLocation.name: "+json.targetLocation.name+"<br/>";
    htmlPage+="Coordinates: "+json.targetLocation.center.latitude+","+json.targetLocation.center.longitude+"<br/>";
	htmlPage+="Radius in m: "+json.targetLocation.radius+"<br/>";
    htmlPage+="Badge: <img src='"+json.rewardedBadge.path+"' />";
    htmlPage+="</div></div>";
    htmlPage+="<div class='questbg" + j + "' onclick='javascript:initiate_geolocation("+json.targetLocation.center.latitude+","+json.targetLocation.center.longitude+","+json.targetLocation.radius+");'><center><span class='getallquest'>Play</span></center></div>";
    htmlPage+="<div id='showarrow' style='margin-bottom:5px'><img id='arrow' src='images/arrow.png' style='visibility:hidden'/></div>";
	document.getElementById("maincontent").innerHTML=htmlPage;
}
///////////////////////////////////////////////////////////////////
/////return from single quest view. clear watchIDs
///////////////////////////////////////
function back(){
		if(locationWatchID != 0){
			navigator.geolocation.clearWatch(locationWatchID);
			locationWatchID=0;
		}
		if(headingWatchID != 0){
			navigator.compass.clearWatch(headingWatchID);
			headingWatchID=0;	
		}	
		showAllQuests();
}
///////////////////////////////////////////////////////////////////
///// Save a solved quest in the phone
///////////////////////////////////////
function addSolvedQuest(questname){
	//alert(questname);
	localStorage.setItem(String.fromCharCode(localStorage.length),questname);
	
		
}

///////////////////////////////////////////////////////////////////////////
//////////////////////// 4 functions to compute distance and show the result
/////////////////////////////////////////////
var inRange = false;
var Qlat=0;
var Qlong=0;
var Qrad=0;
var locationWatchID=0;
var headingWatchID=0;
function initiate_geolocation(latpos,longpos, radius) {
    Qlat=latpos;
    Qlong=longpos;
	Qrad=radius;
    var locationOptions = { maximumAge: 5000, enableHighAccuracy: true  };
	var headingOptions = { frequency: 1000 };	
    if(inRange == false){
		locationWatchID = navigator.geolocation.watchPosition(handle_geolocation_query, onError, locationOptions);
		headingWatchID = navigator.compass.watchHeading(handle_heading, onError, headingOptions)		
    }
}
var ActLat = 0;
var ActLong = 0;
function handle_geolocation_query(position) {
	ActLat = position.coords.latitude;
	ActLong = position.coords.longitude;
    var p1 = new LatLon(ActLat, ActLong);
    var p2 = new LatLon(Qlat, Qlong);
    var dist = p1.distanceTo(p2); 
    if(dist < Qrad * 0.001){ // dist is in km, Qrad in m
		inRange = true;
    }	
    getinfo(dist);
}		
function onError(error) {
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
function getinfo(dist){
    var htmlPage="";
    //$("p").width()
    htmlPage+="<center>The Distance between your position and the quest position is: "+dist+" KM</center>"
    if(inRange){
        htmlPage+="<center>Quest Solved</center>";
		alert("completed"); 
		addSolvedQuest(completed); //This adds the quest to the list of solved quest
		htmlPage+=getFacebookButton();
		document.getElementById("arrow").style.visibility = 'hidden';	
		navigator.geolocation.clearWatch(locationWatchID);
		locationWatchID=0;
		navigator.compass.clearWatch(headingWatchID);
		headingWatchID=0;
		inRange = false;
    }
    else{
        htmlPage+="<center>Not there yet. Try to get closer to the target location</center></br>";
		document.getElementById("arrow").style.visibility = "visible";			
    }
    document.getElementById("showresult").innerHTML=htmlPage;
}
///////////////////////////////////////////////////////////////////////////
//////////////////////// function to create FB button (post to wall)
/////////////////////////////////////////////

function getFacebookButton(){
	var buttonHTML = "<center> <a href='https://www.facebook.com/dialog/feed?app_id=367025673393589&";
		buttonHTML += "link=https://developers.facebook.com/docs/reference/dialogs/&picture=http://trophyhunterfb.s3-website-eu-west-1.amazonaws.com/TrophyHunter/";
		buttonHTML += badgePath;
		buttonHTML += "&name=Trophy Hunter&caption=" + questName;
		buttonHTML += "Badge&description=I just got a Bagde in Trophy Hunter, join me!"
		buttonHTML += "&redirect_uri=https://powerful-depths-8756.herokuapp.com/'>Post on FB Wall</a> </center>"
	return buttonHTML;
}

///////////////////////////////////////////////////////////////////////////
//////////////////////// function to compute bearing and rotate arrow
/////////////////////////////////////////////
function handle_heading(heading) {
    var p1 = new LatLon(ActLat, ActLong);
    var p2 = new LatLon(Qlat, Qlong);
	var bearing = p1.bearingTo(p2);
	var direction = bearing - heading.magneticHeading;
	$('#arrow').rotate(direction);
}