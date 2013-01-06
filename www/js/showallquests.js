$(document).ready(function(){
	var json = JSON.parse(getAllQuests());
	showQuests(json);
});

function showQuests(json){
	var questsArray = json.quest;
	var htmlResult = "";
  
	for(var i in questsArray){
    var quest = questsArray[i];
		htmlResult += "<a href='javascript:showQuest(" + quest.name + ");'>" 
							+ quest.name + "</a></br>";
	}  
	document.getElementById("result").innerHTML=htmlResult;  
}