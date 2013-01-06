function simpleCreateQuest(name, description, badgePath, latitude, longitude, radius)
{

	var resource = "simpleCreateBasicQuest";
	resource = resource + "?name=" + name;
	resource = resource + "&description=" + description;
	resource = resource + "&badgePath=" + badgePath;
	resource = resource + "&latitude=" + latitude;
	resource = resource + "&longitude=" + longitude;
	resource = resource + "&radius=" + radius;

}

function createBadge(badgeName, path)
{
	var resource = "createBadge";
	resource = resource + "?name=" + badgeName;
	resource = resource + "&path=" + path;
	webservicePostRequest(resource);
}

function getAllQuests()
{
	var resource = "getAllQuests";
	return webserviceGetRequest(resource);
}

function getBadgeByName(badgeName)
{
	var resource = "getBadgeByName?name="+badgeName;
	return webserviceGetRequest(resource);
}

function getLocationByName(locationName)
{
	var resource = "getLocationByName?name="+locationName;
	return webserviceGetRequest(resource);
}

function getQuestByName(questName)
{
	var resource = "getQuestByName?name="+questName;
	return webserviceGetRequest(resource);
}

function webserviceGetRequest(resource)
{
	xmlhttp= new XMLHttpRequest;
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}
	
	var server = "http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080"
	var webservice = "/TrophyHunterWebService/rest/";
	var url = server + webservice + resource;

	xmlhttp.open("GET",url,false);
	xmlhttp.send(null);
	return  xmlhttp.responseText;
}

function webservicePostRequest(resource)
{
	xmlhttp=XMLHttpRequest();
	if (xmlhttp==null)
	{
		alert ("Your browser does not support XMLHTTP!");
		return;
	}

	var server = "http://ec2-176-34-85-172.eu-west-1.compute.amazonaws.com:8080"
	var webservice = "/TrophyHunterWebService/rest/";
	var url = server + webservice + resource;

	xmlhttp.open("POST",url,true);
	xmlhttp.send(null);
}