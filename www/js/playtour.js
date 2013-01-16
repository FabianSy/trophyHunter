/////////////////////////////////////////////////////////////////////////
///////Show and play tours
/////////////////////////////////////////////////////////////////////////
function showAllTours(){
    document.getElementById("sidebtn").style.visibility = 'visible';
    document.getElementById("backbtn").style.visibility = "hidden";
    var json = JSON.parse(getAllTours());
    var tourArray = json.compositeQuest;
    var j =1;
    var htmlResult = "";
    htmlResult +="<div>";
    for(var i in tourArray){
        var tour = tourArray[i];
        htmlResult +=  "<div id='"+i+"' class='questbg" + j + "'><center><a  class='getallquest' href=javascript:showTour('" + tour.name  + "'); >" + tour.name + "</a></center></div>";
        htmlResult +=  "<div style='height:2px;background: #EDEFF3'>&nbsp;</div>";
        j+=1;
        if (j>4){
            j=1;
        }
    } 
    htmlResult +="</div>";
    document.getElementById("maincontent").innerHTML=htmlResult;  
}


var latitudes = [];
var longitudes = [];
var radii = [];
function showTour(tourName){
	document.getElementById("sidebtn").style.visibility = 'hidden';
	document.getElementById("backbtn").style.visibility = "visible";
	var htmlContent = "";
	htmlContent += "<div>"
	var j = 1;	//CSS class index. Can range only from 1 to 4.
	var json = JSON.parse(getQuestByName(tourName));
	console.log(json);
	var tourSubQuests = json.subQuests;
	
	var tourImgSize = "150";
	var questImgSize = "75";
	htmlContent += "<div>";
	
	htmlContent+="<div id='showresult' style='margin-bottom:5px'></div>";  
	htmlContent+="<div class='questinfobg' style=' height: 215px;'><div style='color:#ffffff;margin:5px'>";
	htmlContent+="Tour Name: "+json.name+"<br/>"; 
	htmlContent+="Description: "+json.description+"<br/>";
	htmlContent+="<img src = '" + json.rewardedBadge.path + "' style='float:left' width='" + tourImgSize + "' height='" + tourImgSize + "'/>";
	htmlContent+="</div></div>";
	htmlContent+="<div class='questbg" + j + "' onclick='javascript:initiate_geolocation_tour();'><center><span class='getallquest'>Play Tour</span></center></div>";
	htmlContent+="<div id='showarrow' style='margin-bottom:5px'><img id='arrow' src='images/arrow.png' style='visibility:visible' width='50' height='50' /></div>";
	
	//So that the tourSubQuests is always an array even if there is just one object (in which case you iterate over properties rather than objects.)
	tourSubQuests = [].concat(tourSubQuests);
	
	for(var i in tourSubQuests){		
		//alert(i);
		var quest = tourSubQuests[i];
		var jsonQuest = JSON.parse(getQuestByName(quest.name));	
		htmlContent+="<div id='showresult' style='margin-bottom:5px'></div>";
		htmlContent+="<div class='questinfobg' style=' height: 100px;'><div style='color:#ffffff;margin:5px'>";	
		htmlContent+="Badge: <img src='"+jsonQuest.rewardedBadge.path+"' style='float:left' width = '" + questImgSize + "' height = '" + questImgSize + "'/>";
		htmlContent+="Subquest: "+jsonQuest.name+"<br/>";		
    		htmlContent+="Coordinates: "+jsonQuest.targetLocation.center.latitude+" , "+jsonQuest.targetLocation.center.longitude+"<br/>";
    		latitudes.push(jsonQuest.targetLocation.center.latitude);
		longitudes.push(jsonQuest.targetLocation.center.longitude);
		radii.push(jsonQuest.targetLocation.radius);    		
		htmlContent+="Radius in m: "+jsonQuest.targetLocation.radius+"<br/>";		
		htmlContent+="</div>";		
		htmlContent+="</div>";    		
	}	
	htmlContent += "</div>";
	document.getElementById("maincontent").innerHTML=htmlContent;
}

///////////////////////////////////////////////////////////////////////////
//////////////////////// 4 functions to compute distance and show the result
/////////////////////////////////////////////
var inRange = false;
var nearestTarget=-1;
var distToNearest=9999;
var ActLat = 0;
var ActLong = 0;


var Qrad=0;
var locationWatchID=0;
var headingWatchID=0;
function initiate_geolocation_tour() {
    //Qlat=latpos;
    //Qlong=longpos;
    //Qrad=radius;
    var locationOptions = { maximumAge: 5000, enableHighAccuracy: true  };
	var headingOptions = { frequency: 1000 };	
    if(inRange == false){
		locationWatchID = navigator.geolocation.watchPosition(find_nearest_target, onTourError, locationOptions);
		headingWatchID = navigator.compass.watchHeading(handle_tour_heading, onTourError, headingOptions)		
    }
}

function find_nearest_target(position) {
	distToNearest = 9999;
	nearestIndex = -1;
	ActLat = position.coords.latitude;
	ActLong = position.coords.longitude;
	var currentPosition = new LatLon(ActLat, ActLong);			
	
	for (var i in latitudes){		
		//alert(latitudes[i] + " , " + longitudes[i]);
		var questPosition = new LatLon(latitudes[i], longitudes[i]);
		var tempDist = currentPosition.distanceTo(questPosition);
		//alert(tempDist);
		if(tempDist < distToNearest){
			distToNearest = tempDist;
			nearestTarget = i;
		}		
	}	
	
	if(distToNearest < (radii[nearestTarget] * 0.001)){ // distToNearest is in km, radii in meters
		inRange = true;		
	}	
	getinfotour(distToNearest);	
}		

function onTourError(error) {
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

function handle_tour_heading(heading) {
	var currentPosition = new LatLon(ActLat, ActLong);
	var nearestTarget = new LatLon(latitudes[nearestIndex], longitudes[nearestIndex]);
	var bearing = currentPosition.bearingTo(nearestTarget);
	var direction = bearing - heading.magneticHeading;
	$('#arrow').rotate(direction);
}

function getnearesttargetinfo(dist){
    var htmlPage="";
    //$("p").width()
    htmlPage+="<center>The Distance between your position and the nearest quest position is: "+dist+" KM</center>"
    if(inRange){
        htmlPage+="<center>Quest Solved</center>";
		//alert(completed); works
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


function getinfotour(dist){
    var htmlPage="";
    //$("p").width()
    htmlPage+="<center>The Distance between your position and the quest position is: "+dist+" KM</center>"
    if(inRange){
        htmlPage+="<center>Quest Solved</center>";
		alert("completed"); 
		addSolvedQuest(completed); //This adds the quest to the list of solved quest
		htmlPage+=getFacebookButtonTour();
		document.getElementById("arrow").style.visibility = 'hidden';	
		navigator.geolocation.clearWatch(locationWatchID);
		locationWatchID=0;
		//navigator.compass.clearWatch(headingWatchID);
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

function getFacebookButtonTour(){
	var buttonHTML = "<center> <a href='https://www.facebook.com/dialog/feed?app_id=367025673393589&";
		buttonHTML += "link=https://developers.facebook.com/docs/reference/dialogs/&picture=http://trophyhunterfb.s3-website-eu-west-1.amazonaws.com/TrophyHunter/";
		buttonHTML += badgePath;
		buttonHTML += "&name=Trophy Hunter&caption=" + questName;
		buttonHTML += "Badge&description=I just got a Bagde in Trophy Hunter, join me!"
		buttonHTML += "&redirect_uri=https://powerful-depths-8756.herokuapp.com/'>Post on FB Wall</a> </center>"
	return buttonHTML;
}
