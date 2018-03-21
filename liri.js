// Requiring the various libraries
require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

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
// The function that searches for a specific track on spotify
var getSpotify = function(variable) {
    var spotify = new Spotify(keys.spotifyKeys);
     
    if (variable === undefined) {
        variable = "The Sign Ace of Base"
    };
    console.log(variable);
    var spotifyParams = {type: 'track', query: variable}
    spotify.search(spotifyParams, function(err, data) {
        
        if (err) {
            return console.log('Error occured: ' + err)
        }
        
        for (var i = 0; i < data.tracks.items.length; i++) {
            var dataArray = [];
            dataArray.push({
                artist: data.tracks.items[i].artists[0].name,
                name: data.tracks.items[i].name,
                preview: data.tracks.items[i].preview_url,
                album: data.tracks.items[i].album.name
            });
            console.log(dataArray);
            dataToLog(dataArray);
            console.log("------------")
        };
    })
};
// The function that calls the request from the OMDB database
var getMovie = function(variable) {

    if (!variable) {
        variable = "Mr.Nobody"
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + variable + "&y=&plot=short&apikey=ebf08a2";

    request(queryUrl, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var filmInfo = JSON.parse(body)
            var dataArray = [];
            dataArray.push({
                title: "Title: " + filmInfo.Title,
                release: "Year released: " + filmInfo.Year,
                imdbRating: "IMDB Rating: " + filmInfo.Ratings[0].Value,
                rottenTomatoes: "Rotten Tomatoes Rating: " + filmInfo.Ratings[1].Value,
                country: "Film produced in " + filmInfo.Country,
                language: "This film is in " + filmInfo.Language,
                plot: "Synopsis: " + filmInfo.Plot,
                actors: "Actors: " + filmInfo.Actors
            });
            console.log(JSON.stringify(dataArray, null, 2));
            dataToLog(dataArray);
        };
    });
};

// Function that reads the text in random.txt and turns that into a LIRI command
var doRandom = function() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        };

        var dataArray = data.split(",");
        console.log(dataArray);

        switch (dataArray[0]) {
            case "my-tweets":
            getTweets();
            break;
            case "spotify-this-song":
            getSpotify(dataArray[1]);
            break;
            case "movie-this":
            getMovie(dataArray[1]);
            break;
            default:
            console.log("The text in random.txt is indecipherable, check your files");
        };
    });
};

// Function that logs the user input to a file
var dataToLog = function(data) {
    // Appends entered data to a new file named log
    for (var j = 0; j < data.length; j++) {
        fs.appendFile("log.txt", JSON.stringify(data[j], null, 2) + "\r\n", function(err) {
            if (err) {
                return console.log(err);
            };          
        });
    };
    console.log("log.txt was updated")
};
// Allows for multiple words to be in song/movie title
var userInput = process.argv.slice(3).join("+");

switch (process.argv[2]) {
    case "my-tweets":
    getTweets();
    break;
    case "spotify-this-song":
    getSpotify(userInput);
    break;
    case "movie-this":
    getMovie(userInput);
    break;
    case "do-what-it-says":
    doRandom();
    break;
    default:
    console.log("Enter a valid Liri command");
}