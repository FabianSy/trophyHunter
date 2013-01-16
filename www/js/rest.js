function simpleCreateQuest(name, description, badgePath, latitude, longitude, radius)
{
	var resource = "simpleCreateBasicQuest";
	resource += "?name=" + name;
	resource += "&description=" + description;
	resource += "&badgePath=" + badgePath;
	resource += "&latitude=" + latitude;
	resource += "&longitude=" + longitude;
	resource += "&radius=" + radius;
	webservicePostRequest(resource);
}

//example call: createTour('ABCTour', 'Go_to_Aachen_Bonn_and_Cologne', 'badges/abc.jpg', ['Aachen', 'Bonn', 'Cologne'])
function createTour(name, description, badgePath, subQuests)
{
	var resource = "createTour";
	resource += "?name=" + name;
	resource += "&description=" + description;
	resource += "&badgePath=" + badgePath;
	for(var i=0;i<subQuests.length;i++){
		resource += "&subQuests=" + subQuests[i];
	}
	webservicePostRequest(resource);
}

function createBadge(badgeName, path)
{
	var resource = "createBadge";
	resource += "?name=" + badgeName;
	resource += "&path=" + path;
	webservicePostRequest(resource);
}

function getAllQuests()
{
	var resource = "getAllQuests";
	return webserviceGetRequest(resource);
}

function getAllBasicQuests()
{
	var resource = "getAllBasicQuests";
	return webserviceGetRequest(resource);
}

function getAllTours()
{
	var resource = "getAllTours";
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
	xmlhttp = new XMLHttpRequest;
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