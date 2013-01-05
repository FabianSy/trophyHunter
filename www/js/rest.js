function simpleCreateQuest()
{
	var name = document.getElementById("qName").value;
	var description = document.getElementById("qDesc").value;
	var badgePath = document.getElementById("bPath").value;
	var latitude = document.getElementById("lLatitude").value;
	var longitude = document.getElementById("lLongitude").value;
	var radius = document.getElementById("lRadius").value;

	xmlhttp=XMLHttpRequest();
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}

	var url="http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080/TrophyHunterWebService/rest/simpleCreateBasicQuest";
	url=url+"?name="+name;
	url=url+"&description="+description;
	url=url+"&badgePath="+badgePath;
	url=url+"&latitude="+latitude;
	url=url+"&longitude="+longitude;
	url=url+"&radius="+radius;

	xmlhttp.onreadystatechange=function()
	{ 
		if (xmlhttp.readyState==4)
		{ 
			document.getElementById("result").innerHTML="Quest created";
		}
	}
	xmlhttp.open("POST",url,true);
	xmlhttp.send(null);
}

function createBadge()
{
	var badgeName = document.getElementById("bName").value;
	var path = document.getElementById("bPath").value;

	xmlhttp=XMLHttpRequest();
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}

	var url="http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080/TrophyHunterWebService/rest/createBadge";
	url=url+"?name="+badgeName;
	url=url+"&path="+path;

	xmlhttp.onreadystatechange=function()
	{ 
		if (xmlhttp.readyState==4)
		{ 
			document.getElementById("result").innerHTML="Badge created";
		}
	}
	xmlhttp.open("POST",url,true);
	xmlhttp.send(null);
}

function getAllQuests()
{

	xmlhttp=XMLHttpRequest();
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}

	var url="http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080/TrophyHunterWebService/rest/getAllQuests";

	xmlhttp.onreadystatechange=function()
	{ 
		if (xmlhttp.readyState==4)
		{ 
			document.getElementById("result").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

function getBadgeByName()
{
	var badgeName = document.getElementById("bName").value;

	xmlhttp=XMLHttpRequest();
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}

	var url="http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080/TrophyHunterWebService/rest/getBadgeByName";
	url=url+"?name="+badgeName;

	xmlhttp.onreadystatechange=function()
	{ 
		if (xmlhttp.readyState==4)
		{ 
			document.getElementById("result").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

function getLocationByName()
{
	var locationName = document.getElementById("lName").value;

	xmlhttp=XMLHttpRequest();
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}

	var url="http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080/TrophyHunterWebService/rest/getLocationByName";
	url=url+"?name="+locationName;

	xmlhttp.onreadystatechange=function()
	{ 
		if (xmlhttp.readyState==4)
		{ 
			document.getElementById("result").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

function getQuestByName()
{
	var questName = document.getElementById("qName").value;

	xmlhttp=XMLHttpRequest();
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}

	var url="http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080/TrophyHunterWebService/rest/getQuestByName";
	url=url+"?name="+questName;

	xmlhttp.onreadystatechange=function()
	{ 
		if (xmlhttp.readyState==4)
		{ 
			document.getElementById("result").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

function test(){
	document.getElementById("result").innerHTML=document.getElementById("bName").value;
}