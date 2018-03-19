require("dotenv").config();
var fs = require("fs")
var keys = require("./keys.js");

var twitter = require("twitter");
var spotify = require("spotify");

var client = new twitter(keys.twitterKeys);
var spotify = new spotify(keys.spotifyKeys);
