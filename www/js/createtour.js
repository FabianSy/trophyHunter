/////////////////////////////////////////////////////////////////////////
///////Create Tours
/////////////////////////////////////////////////////////////////////////

var questsArray;
var selectionArray;

function createTourScreen(){
    var json = JSON.parse(getAllBasicQuests());
    questsArray = json.basicQuest;
	selectionArray = new Array(questsArray.length);
    var htmlResult = "";
	htmlResult += "<div><input id='title' type='text' value='Tour Name'/></div>";
	htmlResult += "<div><input id='desc' type='text' value='Tour Description'/></div>";	
	htmlResult += "<div>Select Quests</div>";	
    for(var i in questsArray){
        var quest = questsArray[i];
        htmlResult +=  "<a id='"+ i +"' data-role=button data-theme='c' href=javascript:selectQuest(" + i + "); >" + quest.name + "</a>";
    }
	htmlResult += "<div><a data-role=button data-theme='a' href='javascript:createNewTour();'>Create Tour</a></div>";	
    $('#maincontent').html(htmlResult);
	$('#maincontent').trigger('create');
}

//create Tour in amazon server and reset form.
function createNewTour(){

	var name = document.getElementById("title").value;
	var description = document.getElementById("desc").value;
	var badgePath = "basicbadges/Bonn.jpg";
	var subQuests = new Array();
	
	if(name != "Tour Name"){ //Make sure a title was entered
	
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
			$('#'+j).buttonMarkup({theme : "c"});
		}	
	}
}

//change color of quest buttons and mark quests as (not) selected
function selectQuest(i){
	if(selectionArray[i] == 'true'){
		//set to not selected
		$('#'+i).buttonMarkup({theme : "c"});
		selectionArray[i] = 'false';
	}else{
		//set to selected
		$('#'+i).buttonMarkup({theme : "b"});
		selectionArray[i] = 'true';	
	}
}