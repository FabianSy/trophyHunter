//Code for toggling the aside tag of the design
var togglechanged=false;
(function(){
    $(document).ready(function(){

$("div.questbg").click(function () {
      $(this).slideUp();
    });    
$('a.pageanimate').click(function(){    
        //$('img.pageanimate').click(function(){
            if(togglechanged){
                togglechanged=false;
                $('#page').animate({left:'0px'});
                $('#m-aside').animate({left:'-260px'});
            }
            else {
                togglechanged=true;
                //$("#maincontent").
                $('#page').animate({left:'260px'});
                $('#m-aside').animate({left:'0px'});
            }
        });          
    });
})();
/////////////////////////////
////to load the content of the requested htlm page
/////////////////////////////
function loadPage(pageName)
{
	$('#maincontent').load(pageName);
}
/////////////////////////////////////////////////////////////////////////
///////Show all quests code in the page
/////////////////////////////////////////////////////////////////////////
function showAllQuests(){
    document.getElementById("sidebtn").style.visibility = 'visible';
    document.getElementById("backbtn").style.visibility = "hidden";
    var json = JSON.parse(getAllQuests());
    var questsArray = json.quest;
    var j =1;
    var htmlResult = "";
    htmlResult +="<div>";
    for(var i in questsArray){
        var quest = questsArray[i];
        htmlResult +=  "<div id='"+i+"' class='questbg" + j + "'><center><a  class='getallquest' href=javascript:showQuest('" + quest.name + "'," + j + "); >" + quest.name + "</a></center></div>";
        htmlResult +=  "<div style='height:2px;background: #EDEFF3'>&nbsp;</div>";
        j+=1;
        if (j>4){
            j=0;
        }
    } 
    htmlResult +="</div>";
    document.getElementById("maincontent").innerHTML=htmlResult;  
}
///////////////////////////////////////////////////////////////////
/////show the quest information in a seperated view
///////////////////////////////////////
function showQuest(questName,j){
    document.getElementById("sidebtn").style.visibility = 'hidden';
    document.getElementById("backbtn").style.visibility = "visible";
    var json = JSON.parse(getQuestByName(questName));
    console.log(json);
    document.getElementById("sidebtn").style.visibility = 'hidden';
    document.getElementById("backbtn").style.visibility = "visible";
    var htmlPage="";        
    htmlPage+="<div id='showresult' style='margin-bottom:5px'></div>";  
    htmlPage+="<div class='questinfobg' style=' height: 150px;'><div style='color:#ffffff;margin:5px'>";
    htmlPage+="name: "+json.name+"<br/>";
    htmlPage+="targetLocation.name: "+json.targetLocation.name+"<br/>";
    htmlPage+="Coordinates: "+json.targetLocation.center.latitude+","+json.targetLocation.center.longitude+"<br/>";
	htmlPage+="Radius: "+json.targetLocation.radius+"<br/>";
    htmlPage+="Badge: <img src='"+json.rewardedBadge.path+"' />";
    htmlPage+="</div></div>";
    htmlPage+="<div class='questbg" + j + "'><center><a href='javascript:initiate_geolocation("+json.targetLocation.center.latitude+","+json.targetLocation.center.longitude+","+json.targetLocation.radius+");' class='getallquest'>Play</a></center></div>";
    htmlPage+="<div id='showarrow' style='margin-bottom:5px'><img id='arrow' src='images/arrow.png' style='visibility:hidden'/></div>";
	document.getElementById("maincontent").innerHTML=htmlPage;
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
    var locationOptions = { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true  };
	var headingOptions = { frequency: 3000 };	
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
    if(dist < Qrad){
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
		document.getElementById("arrow").style.visibility = 'hidden';	
		navigator.geolocation.clearWatch(locationWatchID);
		navigator.compass.clearWatch(headingWatchID);
    }
    else{
        htmlPage+="<center>Not there yet. Try to get closer to the target location</center></br>";
		document.getElementById("arrow").style.visibility = "visible";			
    }
    document.getElementById("showresult").innerHTML=htmlPage;
}

///////////////////////////////////////////////////////////////////////////
//////////////////////// 2 functions to compute bearing and rotate arrow
/////////////////////////////////////////////
function handle_heading(heading) {
    var p1 = new LatLon(ActLat, ActLong);
    var p2 = new LatLon(Qlat, Qlong);
	var bearing = p1.bearingTo(p2);
	var direction = heading.magneticHeading - bearing;
	$('#arrow').rotate(direction);
}