$(document).ready(function(){
	var json = JSON.parse(getAllQuests());
	showAllQuests(json);
});

function isSolved(questname){
	var solved=false;
	for(var i=0;i<localStorage.lenght;i++){
		if (questname == localStorage.getItem(localStorage.key(i))){
			solved = true;
			return solved;
		}
		else{
		}
	}
	return solved;
}

function showAllQuests(json){
	var questsArray = json.quest;
	var htmlResult = "";
  
	for(var i in questsArray){
		var quest = questsArray[i];
		if(!isSolved(quest.name)){
			htmlResult += "<a href=javascript:showQuest('" + quest.name + "');>" 
							+ quest.name + "</a></br>";
		}
			
	}  
	document.getElementById("result").innerHTML=htmlResult;  
}

function showQuest(questName){
	var json = JSON.parse(getQuestByName(questName));
  console.log(json);
	
	var htmlPage= "<br/><span class='lableText'>The following data have been saved as a new quest:</span><br/>";
	htmlPage=htmlPage+ "<div style='width:90%;float:left;margin:10px;'>";
	htmlPage=htmlPage+"<div><span class='lableText'>Quest Title:&nbsp;</span><span class='dataStyle' style='float:left;'>"+json.name+"</span><br/>";
	htmlPage=htmlPage+"<div><span class='lableText'>City Name:&nbsp;</span><span id='cityName' class='dataStyle'>"+json.targetLocation.name+"</span></div>";
	htmlPage=htmlPage+"<div><span class='lableText'>Latitude:&nbsp;</span><span id='LatValue' class='dataStyle'>"+json.targetLocation.center.latitude+"</span></div>";
	htmlPage=htmlPage+"<div><span class='lableText'>Longitude:&nbsp;</span><span id='LongValue' class='dataStyle'>"+json.targetLocation.center.longitude+"</span></div>";
	htmlPage=htmlPage+"</div>";
	htmlPage=htmlPage+"<div class='badgediv'>";
	htmlPage=htmlPage+"<span class='lableText'>Badge&nbsp;&nbsp;</span>";
	htmlPage=htmlPage+"<div style=' margin-top:2px; width:50px; float:left'><img id='img3' alt='' src='"+json.rewardedBadge.path+"' width='47' height='50'/></div>";
	htmlPage=htmlPage+"</div>";

	htmlPage=htmlPage+"<div><a href='javascript:;'><img id='btnShowQ' alt='' src='images/start.png' border='0' width='100' height='25' style='float: right' /></a>&nbsp;&nbsp;&nbsp;<span class='lableText'><a href='showallquests.html'>Back</a></span></div>";
	document.getElementById("result").innerHTML=htmlPage;	
}