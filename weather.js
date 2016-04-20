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


// > npm install prompt, request, colors, node-emoji
var prompt = require('prompt');
var request = require('request');
var colors = require('colors');
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
            // Convert the first letter of a sting to lowercase for those used inline with sentences and remove the fullstop
            function convertLower(str) {
                return str.charAt(0).toLowerCase() + str.substring(1, str.length - 1);
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
            console.log("\nThe weather in ".red + myCity.red + " for the next 6 days will be:\n".red);
            for(var i = 0; i <= 5; i++) {
              
                // Check for the icon and set the corresponding emoji in the object 
                var wIcon = result2Object.daily.data[i].icon;
    
                switch (wIcon) {
                    case "clear-day":
                        wIcon = emoji.get('sunny').yellow;
                    break;
                    case "clear-night":
                        wIcon = emoji.get('night_with_stars');
                    break;
                    case "rain":
                        wIcon = emoji.get('umbrella').blue;
                    break;
                    case "snow":
                        wIcon = emoji.get('snowflake').white;
                    break;
                    case "sleet":
                        wIcon = emoji.get('droplet').blue;
                    break;
                    case "wind":
                        wIcon = emoji.get('warning').magenta;
                    break;
                    case "fog":
                        wIcon = emoji.get('foggy').grey;
                    break;
                    case "cloudy":
                        wIcon = emoji.get('cloud').grey;
                    break;
                    case "partly-cloudy-day":
                        wIcon = emoji.get('partly_sunny');
                    break;
                    case "partly-cloudy-night":
                        wIcon = emoji.get('crescent_moon');
                    break;
                    default:
                        wIcon = emoji.get('sunny').yellow;
                    break;
                }
                
               forecast[dayName(result2Object.daily.data[i].time)] = {summary:convertLower(result2Object.daily.data[i].summary), tempMin: tempC(result2Object.daily.data[i].temperatureMin), tempMax: tempC(result2Object.daily.data[i].temperatureMax), icon: wIcon};
            }

            for(var prop in forecast){
                console.log(forecast[prop].icon + " " + prop.bold  + " will be " + forecast[prop].summary + ", with temperatures ranging from " + forecast[prop].tempMin + " C to " + forecast[prop].tempMax + " C.\n");
            }
        });
    });
});



