//Parsing the JSON data to a JavaScript variable adapted from Web App Dev lecture notes and practical 6.


var parsedObj;
var xmlhttp = new XMLHttpRequest();
var url = "Json/Daily.json"

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        
        parsedObj = JSON.parse(xmlhttp.responseText);    
        displayJSON(parsedObj); 
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

//Onclick process function adapted from htmldog and developer.mozilla.org. 
function process(event) {
    var days = document.getElementById('myselect').value;
    document.getElementById('tablediv').innerHTML = days;
    displayJSON(days);
}


function displayJSON(selectday) {
    
    //Checkbox variables and onclick function adapted from developer.mozilla.org. 

    var myPress = document.getElementById('pressure').checked;
    var myHumid = document.getElementById('humid').checked;
    var myWind = document.getElementById('windspeed').checked;

    //Table JS and HTML adapted from Web App Dev Practical 6 solution
    var dailyArray = parsedObj.list;
    var dailyInfo = "<table>";
    dailyInfo += "<tr><th>Date</th><th>Description</th><th><th>Temp Min. °</th><th>Temp Max. °</th> <th>Rainfall mm</th> ";  
    //If statements below JS adapted from Web App Dev Practical 5 solutions
    if (myPress == true){
        dailyInfo += "<th>Pressure %</th>";
    }
    
    if (myHumid== true){
        dailyInfo += "<th>Humidity</th>";
    } 
    
    if (myWind == true){
        dailyInfo += "<th>Wind Speed (kts)</th></tr>";
    }

    
    var daycounter = selectday;
    
    for (var i=0; i < daycounter; i++) 
    
    {   
        //datetime, localtime, rounding variables taken from Stackoverflow https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
        var dateTime = dailyArray[i].dt;
            var newTime = new Date(dateTime*1000);
            var localtime = newTime.toLocaleDateString();
        var tempMin = dailyArray[i].temp.min;
            var tempMin = (tempMin).toFixed(0);
        var tempMax = dailyArray[i].temp.max;
            var tempMax = (tempMax).toFixed(0);
        var description = dailyArray[i].weather[0].description;
        var weathericons = dailyArray[i].weather[0].icon;
        var pressureValue = dailyArray[i].pressure; 
        var humidityValue = dailyArray[i].humidity;
        var speedValue = dailyArray[i].speed;
        var rainValue = dailyArray[i].rain;


        dailyInfo += "<tr><td>" + localtime + "</td><td>" + description + "</td><td><img height = '60px' width = '60px' src='http://openweathermap.org/img/w/" + weathericons + ".png' /></td><td>" + tempMin + "</td> <td>" + tempMax + "</td><td>" + rainValue + "</td>";
        
        if (myPress == true){
            dailyInfo += "<td>" + pressureValue + "</td>";
        }
        
        if (myHumid == true){
            dailyInfo += "<td>" + humidityValue + "</td>";
        }
        
        if (myWind == true){
            dailyInfo += "<td>" + speedValue + "</td></tr>";
        }
        
    }

    dailyInfo += "</table>"; 

    document.getElementById("tablediv").innerHTML = dailyInfo;
    
}
   