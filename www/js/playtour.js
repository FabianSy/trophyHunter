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
	htmlContent+="<div class='questbg" + j + "' onclick='javascript:'><center><span class='getallquest'>Play Tour</span></center></div>";
	htmlContent+="<div id='showarrow' style='margin-bottom:5px'><img id='arrow' src='images/arrow.png' style='visibility:visible' width='50' height='50' /></div>";
	
	for(var i in tourSubQuests){		
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
	}	
	htmlContent += "</div>";
	document.getElementById("maincontent").innerHTML=htmlContent;
}