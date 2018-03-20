// Requiring the various libraries
require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var spotify = require("spotify");

// The function that calls for the most recent tweets
var getTweets = function() {
    var client = new Twitter(keys.twitterKeys);
    
    var params = {screen_name: 'CaptainVariable', count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
        if (error) {
            console.log(error)
        } else {
            var data = [];
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'created at: ' : tweets[i].created_at,
                    'Tweets' : tweets[i].text,
                });
            };
            console.log(data);
            dataToLog(data);
        };
    });
};

var getSpotify = function(variable) {

}

// Function that logs the user input to a file
var dataToLog = function(data) {
    // Appends entered data to a new file named log
    for (var j = 0; j < data.length; j++) {
        fs.appendFile("log.txt", JSON.stringify(data[j]) + "\r\n", function(err) {
            if (err) {
                return console.log(err);
            };          
        });
    };
    console.log("log.txt was updated")
};


switch (process.argv[2]) {
    case "my-tweets":
    getTweets();
    break;
    case "spotify-this-song":
    getSpotify(process.argv[3]);
    break;
    case "movie-this":
    getMovie(process.argv[3]);
    break;
    case "do-what-it-says":
    doRandom();
    break;
    default:
    console.log("Enter a valid Liri command");
}