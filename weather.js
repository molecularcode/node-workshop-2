// Ex6 - How's the weather?
// -----------------------------------------------------------------

// Go to Forecast.io API and read the documentation
// Get yourself a free API key
// Remember the Google Geocoding API from yesterday's workshop
// Using both APIs, complete the following workflow:
//   Ask the user for their location
//   Retrieve the weather for the user's location
//   Display the current weather as well as the next 5 days weather in a nice way
//   Hint: to display the results in a nice way, a few NPM modules could be useful, including but not limited to:
//      colors
//      cli-table
//      node-emoji


// > npm install prompt
// > npm install request
var prompt = require('prompt');
var request = require('request');


prompt.start();


// Variables
var weatherURL = "https://api.forecast.io/forecast/7298fab27156019c9294fb3884ffb5ed/";


// Get the user's location
prompt.get(['locationCity'], function (err, result) {
    var loc = result.locationCity.toLowerCase().replace(/ /g, "%20"); // convert to lowercase and replace spaces
    var googleAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + loc;
    
    
    request(googleAPI, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var myCity = resultObject.results[0].formatted_address;
        var myLat = resultObject.results[0].geometry.location.lat;
        //var myLat2 = resultObject.results[0].geometry.location.lat.toFixed(2);
        var myLon = resultObject.results[0].geometry.location.lng;
        //var myLon2 = resultObject.results[0].geometry.location.lng.toFixed(2);
        //console.log ("\nThe latitude of " + myCity + " is " + myLat2 + " and the longitude is " + myLon2 + ".\n");
        
        // Construct the url of the weather for the user's location
        var fullWeatherURL = weatherURL + myLat + "," + myLon;
        //console.log(fullWeatherURL);
        
        // Retrieve the weather for the user's location
        request(fullWeatherURL, function(err, result2) {
            var result2Object = JSON.parse(result2.body);
            //console.log(result2Object);
            
            // Get current weather for user's location
            var curSum = result2Object.currently.summary;
            var curTemp = ((result2Object.currently.temperature - 32) * 5/9).toFixed(1);
            var curWindSp = result2Object.currently.windSpeed;
            var curCloudCov = result2Object.currently.cloudCover;
            
            console.log("The weather in " + myCity + " is currently: \n" +
            "Summary: " + curSum + "\n" +
            "Temperature: " + curTemp + " C\n" +
            "Wind Speed: " + curWindSp + " mi/hr\n" +
            "Cloud Cover: " + curCloudCov
            );
            
            
            // Get 5 day forecast for user's location
        });
    });
});



