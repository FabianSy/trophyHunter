/////////////////////////////////////////////////////////////////////////
///////Show and play tours
/////////////////////////////////////////////////////////////////////////
function showAllTours(){
	resetTourParameters();
    var json = JSON.parse(getAllTours());
    var tourArray = json.tour;
    var htmlResult = "";
    htmlResult +="<div>";
    for(var i in tourArray){
        var tour = tourArray[i];
        htmlResult +=  "<a data-role=button data-theme='b' href=javascript:showTour('" + tour.name  + "'); >" + tour.name + "</a>";
    } 
    htmlResult +="</div>";
    updateHTML("maincontent", htmlResult);
}


var latitudes = [];
var longitudes = [];
var radii = [];
var completedQuestFlags = [];
var completedQuestNames = "";
var questsNameList = [];
var tourName;
var tourBadge;
var completedQuestCount = 0;
var totalQuests = 0;
function showTour(displayTourName){
	var htmlContent = "";
	htmlContent += "<div>"
	var j = 1;	//CSS class index. Can range only from 1 to 4.
	var json = JSON.parse(getQuestByName(displayTourName));
	console.log(json);
	var tourSubQuests = json.subQuests;
	
	var tourImgSize = "150";
	var questImgSize = "75";
	htmlContent += "<div>";
	
	htmlContent+="<div id='showresult' style='margin-bottom:5px'></div>";  
	htmlContent+="<div class='questinfobg' style=' height: 215px;'><div style='color:#ffffff;margin:5px'>";
	htmlContent+="Tour Name: "+json.name+"<br/>"; 
	tourName = json.name;
	htmlContent+="Description: "+json.description+"<br/>";
	htmlContent+="<img src = '" + json.rewardedBadge.path + "' style='float:left' width='" + tourImgSize + "' height='" + tourImgSize + "'/>";
	tourBadge = json.rewardedBadge.path;
	htmlContent+="</div></div>";
	htmlContent+="<a id='playButton' data-role=button data-theme='a' href=javascript:initiate_geolocation_tour();>Play Tour</a>";
	htmlContent+="<a data-role=button data-theme='a' href=javascript:fakeTourCompletion();>Fake a Result</a>";
	htmlContent+="<div id='showarrow' style='margin-bottom:5px'><img id='arrow' src='images/arrow.png' style='visibility:visible' width='50' height='50' /></div>";
	
	//So that the tourSubQuests is always an array even if there is just one object (in which case you iterate over properties rather than objects.)
	tourSubQuests = [].concat(tourSubQuests);

	for(var i in tourSubQuests){		
		//alert(i);			
		if((completedQuestCount == 0) || ((completedQuestCount > 0) && (completedQuestFlags[i]==0))) {
			var quest = tourSubQuests[i];
			var jsonQuest = JSON.parse(getQuestByName(quest.name));	
			htmlContent+="<div id='showresult' style='margin-bottom:5px'></div>";
			htmlContent+="<div class='questinfobg' style=' height: 100px;'><div style='color:#ffffff;margin:5px'>";	
			htmlContent+="Badge: <img src='"+jsonQuest.rewardedBadge.path+"' style='float:left' width = '" + questImgSize + "' height = '" + questImgSize + "'/>";
			htmlContent+="Subquest: "+jsonQuest.name+"<br/>";		
			htmlContent+="Coordinates: "+jsonQuest.targetLocation.center.latitude+" , "+jsonQuest.targetLocation.center.longitude+"<br/>";
			htmlContent+="Radius in m: "+jsonQuest.targetLocation.radius+"<br/>";		
			htmlContent+="</div>";		
			htmlContent+="</div>";    
			if(completedQuestCount == 0){
				completedQuestFlags.push(0);
				latitudes.push(jsonQuest.targetLocation.center.latitude);
				longitudes.push(jsonQuest.targetLocation.center.longitude);			
				radii.push(jsonQuest.targetLocation.radius);  
				totalQuests = totalQuests+1;
				questsNameList.push(jsonQuest.name);
			}
		}	
		else{
			htmlContent += "";
		}		
	}	
	//alert(totalQuests);
	htmlContent += "</div>";
	updateHTML("maincontent", htmlContent);
}

///////////////////////////////////////////////////////////////////////////
//////////////////////// 4 functions to compute distance and show the result
/////////////////////////////////////////////
var inRange = false;
var nearestTargetIndex=-1;
var distToNearestTarget=9999;
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
	distToNearestTarget = 9999;
	nearestTargetIndex = -1;
	ActLat = position.coords.latitude;
	ActLong = position.coords.longitude;
	//alert(ActLat + ' , ' + ActLong);
	var currentPosition = new LatLon(ActLat, ActLong);			
	
	for (var i in latitudes){		
		//alert(latitudes[i] + " , " + longitudes[i]);
		var questPosition = new LatLon(latitudes[i], longitudes[i]);
		var tempDist = currentPosition.distanceTo(questPosition);
		
		if((tempDist < distToNearestTarget) && (completedQuestFlags[i]==0)){
			distToNearestTarget = tempDist;
			nearestTargetIndex = i;			
		}		
	}	
	
	if(distToNearestTarget < (radii[nearestTargetIndex] * 0.001)){ // distToNearestTarget is in km, radii in meters
		inRange = true;		
	}	
	getinfotour(distToNearestTarget);	
}		

function onTourError(error) {
  alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}

function handle_tour_heading(heading) {
	var currentPosition = new LatLon(ActLat, ActLong);
	var nearestTargetPosition = new LatLon(latitudes[nearestTargetIndex], longitudes[nearestTargetIndex]);
	var bearing = currentPosition.bearingTo(nearestTargetPosition);
	var direction = bearing - heading.magneticHeading;
	$('#arrow').rotate(direction);
}

function getinfotour(dist){
    var htmlPage="";
    //$("p").width()	
	htmlPage+="<center> Latitudes : " + latitudes.length + " Longitudes : " + longitudes.length + " </center>";
	htmlPage+="<center>Your coordinates : " + ActLat + " , " + ActLong + "</center>";
    htmlPage+="<center>The Distance between your position and <strong>" + questsNameList[nearestTargetIndex] + "</strong> is: <strong>"+distToNearestTarget+" KM </strong> </center> <br/>";
    if(inRange){
		completedQuestFlags[nearestTargetIndex] = 1;
		completedQuestCount = completedQuestCount+1;
		
		if(completedQuestCount < totalQuests){				
			//Updates the list of completed subquests whenever a subquest is completed.
			if(completedQuestCount > 1)
				completedQuestNames += ", ";
			completedQuestNames += questsNameList[nearestTargetIndex];			
			nearestDist = 9999;
			nearestTargetIndex = -1;
			inRange = false;
			showTour(tourName);
		}
		else if (completedQuestCount == totalQuests){
			htmlPage ="<center> <strong> All Sub Quest(s) solved. </strong> </center> <br/>";
			htmlPage+="<center> <strong> Tour Completed !! </strong> </center>";			
			showTour(tourName);
			htmlPage+=getFacebookButtonTour();
			document.getElementById("arrow").style.visibility = 'hidden';				
			resetTourParameters();
		}        
    }
    else{
        htmlPage+="<center>Not there yet. Try to get closer to the target location</center></br>";
		document.getElementById("arrow").style.visibility = "visible";			
    }
	
	if((completedQuestCount > 0) && (completedQuestCount < totalQuests)){			
		var questsRemaining = totalQuests-completedQuestCount;
		htmlPage+="<center> <strong>" + completedQuestNames + " Sub Quest(s) solved. <br/> " + questsRemaining + " Sub Quest(s) remaining. </strong> </center>";
	}
    document.getElementById("playButton").style.visibility = 'hidden';
    updateHTML("showresult", htmlPage);
}
///////////////////////////////////////////////////////////////////////////
//////////////////////// function to create FB button (post to wall)
/////////////////////////////////////////////

function getFacebookButtonTour(){
	var buttonHTML = "<a data-role=button data-theme='a' href='https://www.facebook.com/dialog/feed?app_id=367025673393589&";
		buttonHTML += "link=https://developers.facebook.com/docs/reference/dialogs/&picture=http://trophyhunterfb.s3-website-eu-west-1.amazonaws.com/TrophyHunter/";
		buttonHTML += tourBadge;
		buttonHTML += "&name=Trophy Hunter&caption=" + tourName;
		buttonHTML += "Badge&description=I just got a Bagde in Trophy Hunter, join me!"
		//buttonHTML += "&redirect_uri=https://powerful-depths-8756.herokuapp.com/'>Post on FB Wall</a> </center>"
		buttonHTML += "&redirect_uri=https://www.facebook.com/'>Post on FB Wall</a>"
	return buttonHTML;
}

function fakeTourCompletion(){	
	find_fake_nearest_target();
	inRange = true;
	//alert('Completing : ' + nearestTargetIndex + ' of totally : ' + totalQuests);
	getinfotour(0);
	if(completedQuestCount < totalQuests){
		find_fake_nearest_target();
		inRange = false;
		getinfotour(distToNearestTarget);
	}	
}

function resetTourParameters(){
	inRange = false;
	completedQuestNames = "";
	questsNameList.length = 0;
	completedQuestFlags.length = 0;
	completedQuestCount = 0;
	totalQuests = 0;
	tourName = "";
	tourBadge = "";
	distToNearestTarget = 9999;
	nearestTargetIndex = -1;
	latitudes.length = 0;
	longitudes.length = 0;
	radii.length = 0;
	ActLat = 0;
	ActLong = 0;
	
	if(locationWatchID!=0)
		navigator.geolocation.clearWatch(locationWatchID);
	locationWatchID=0;
	
	if(headingWatchID!=0)
		navigator.compass.clearWatch(headingWatchID);
	headingWatchID=0;
}

function find_fake_nearest_target() {	
	distToNearestTarget = 999;
	nearestTargetIndex = -1;
	var currentPosition = new LatLon(ActLat, ActLong);			
	
	for (var i in latitudes){		
		//alert(latitudes[i] + " , " + longitudes[i]);
		var questPosition = new LatLon(latitudes[i], longitudes[i]);
		var tempDist = currentPosition.distanceTo(questPosition);
		
		if((tempDist < distToNearestTarget) && (completedQuestFlags[i]==0)){
			distToNearestTarget = tempDist;
			nearestTargetIndex = i;			
		}		
	}	
	
	if(distToNearestTarget < (radii[nearestTargetIndex] * 0.001)){ // distToNearestTarget is in km, radii in meters
		inRange = true;		
	}	

}