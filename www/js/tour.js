/////////////////////////////////////////////////////////////////////////
///////Create Tours
/////////////////////////////////////////////////////////////////////////

var questsArray;
var selectionArray;

function createTourScreen(){
    document.getElementById("sidebtn").style.visibility = 'visible';
    document.getElementById("backbtn").style.visibility = "hidden";
    var json = JSON.parse(getAllBasicQuests());
    questsArray = json.basicQuest;
	selectionArray = new Array(questsArray.length);
    var htmlResult = "";
    htmlResult +="<div>";
	htmlResult += "<div><span class='lableText'>Tour Title:&nbsp;</span><input id='title' type='text'/></div>";
	htmlResult += "<div><span class='lableText'>Tour Description:&nbsp;</span><input id='desc' type='text' /></div>";	
    for(var i in questsArray){
        var quest = questsArray[i];
        htmlResult +=  "<div id='"+i+"' class='questbg2'><center><a  class='getallquest' href=javascript:selectQuest('" + quest.name + "'," + i + "); >" + quest.name + "</a></center></div>";
        htmlResult +=  "<div style='height:2px;background: #EDEFF3'>&nbsp;</div>";
    }
	htmlResult += "<div class='btnDiv' ><a href='javascript:createTour();' onclick='createNewTour()'><img  id='btnconfirm' alt='' src='images/confirm.png' border='0' width='91' height='25' /></a></div>";	
    htmlResult +="</div>";
    document.getElementById("maincontent").innerHTML=htmlResult;  
}

//create Tour in amazon server and reset form.
function createNewTour(){
	var name = document.getElementById("title").value;
	var description = document.getElementById("desc").value;
	var badgePath = "basicBadges/Bonn.jpg";
	var subQuests = new Array();
	
	for(var j in selectionArray){
		if(selectionArray[j] == 'true'){
			subQuests.push(questsArray[j].name);
		}
	}	
	
	createTour(name, description, badgePath, subQuests);
	
	document.getElementById("title").value = "";
	document.getElementById("desc").value = "";	
	
	for(var j in selectionArray){
		selectionArray[j] = 'false';
		document.getElementById(j).className='questbg2';
	}	
	
}

//change color of quest buttons and mark quests as (not) selected
function selectQuest(questName, i){
	if(selectionArray[i] == 'true'){
		//set to not selected
		document.getElementById(i).className='questbg2';
		selectionArray[i] = 'false';
	}else{
		//set to selected
		document.getElementById(i).className='questbg4';
		selectionArray[i] = 'true';	
	}
}