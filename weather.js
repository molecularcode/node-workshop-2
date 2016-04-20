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


// > npm install prompt, request, colors, cli-table, node-emoji
var prompt = require('prompt');
var request = require('request');
var colors = require('colors');
var table = require('cli-table');
var emoji = require('node-emoji');
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
        var myLon = resultObject.results[0].geometry.location.lng;
        
        // Construct the url of the weather for the user's location
        var fullWeatherURL = weatherURL + myLat + "," + myLon;
        
        // Retrieve the weather for the user's location
        request(fullWeatherURL, function(err, result2) {
            var result2Object = JSON.parse(result2.body);
            
            /* Weather functions
            ------------------------------------------------------------- */
            // Convert the first letter of a sting to lowercase for those used inline with sentences
            function convertLower(str) {
                return str.charAt(0).toLowerCase() + str.substring(1);
            }
            
            // Convert temperatures from F to C
            function tempC(str) {
                return ((str - 32) * 5/9).toFixed(0);
            }
            
            // Get day number and pull the day name from an array
            function dayName(num) {
                var date = new Date(num*1000);
                var day = date.getDay();
                var days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
                return days[day];
            }


            // Get current weather for user's location for today and the following 5 days and stuff in to an object
            var forecast = {};
            for(var i = 0; i <= 5; i++) {
              
            // Check for the icon and set the corresponding emoji in the object 
            var wIcon = result2Object.daily.data[i].icon;

            switch (wIcon) {
                case "clear-day":
                    wIcon = emoji.get('sunny');
                break;
                case "clear-night":
                    wIcon = emoji.get('night_with_stars');
                break;
                case "rain":
                    wIcon = emoji.get('umbrella');
                break;
                case "snow":
                    wIcon = emoji.get('snowflake');
                break;
                case "sleet":
                    wIcon = emoji.get('droplet');
                break;
                case "wind":
                    wIcon = emoji.get('warning');
                break;
                case "fog":
                    wIcon = emoji.get('foggy');
                break;
                case "cloudy":
                    wIcon = emoji.get('cloud');
                break;
                case "partly-cloudy-day":
                    wIcon = emoji.get('partly_sunny');
                break;
                case "partly-cloudy-night":
                    wIcon = emoji.get('crescent_moon');
                break;
                default:
                    wIcon = emoji.get('sunny');
                break;
            }
                
            forecast[dayName(result2Object.daily.data[i].time)] = {summary:convertLower(result2Object.daily.data[i].summary), min: tempC(result2Object.daily.data[i].temperatureMin), max: tempC(result2Object.daily.data[i].temperatureMax), icon: wIcon};
            }
            
            console.log(forecast);
            
            console.log("\nThe weather in " + myCity + " is currently: \n" +
            // "Summary: " + emoji.get('coffee') + curSum + "\n" +
            // "Temperature: " + curTemp + " C\n" +
            // "Wind Speed: " + curWindSp + " mi/hr\n" +
            // "Cloud Cover: " + curCloudCov + "\n"
            // );
            
            // var foreSum = convertLower(result2Object.daily.summary);
            // console.log("The weather for the next 5 days will be " + foreSum + "\n");
            
            // console.log(forecast["foreNext" + i + "Day"] + " will be " + forecast["foreNext" + i + "Sum"] + " with temparatures ranging from " + forecast["foreNext" + i + "TempMin"] + " C to " + forecast["foreNext" + i + "TempMax"] + " C.\n");

        });
    });
});



