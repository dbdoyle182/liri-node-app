# liri-node-app

This project uses Node.js and JavaScript to create a command line app that functions as limited version of Apple's Siri. The app accesses Twitter, Spotify and OMBD through their APIs to receive different levels of information. The Twitter API provides 20 of the user's most recent tweets. The Spotify API allows the user to search for a song by title or title and band name; it provides multiple responses. OMBD provides selected information about the title of the film searched.

## Getting Started

Twitter and Spotify require any potential users to provide their own .env file with keys to the different APIs. OMBD has an access key built into the code but it would work more reliably if you provided your personal key. Default searches are provided for both OMBD and Spotify.

##Prerequisites

* Dotenv
    * npm i dotenv
    [Instructions for Dotenv](https://www.npmjs.com/package/dotenv)
* Chalk
    * npm i chalk
    [Instructions for Chalk](https://www.npmjs.com/package/chalk)
* Chalk Animation
    * npm i chalk-animation
    [Instructions for Chalk Animation](https://www.npmjs.com/package/chalk-animation)
* Twitter
    * npm i twitter
    [Instructions for Twitter](https://www.npmjs.com/package/twitter)
* Spotify
    * npm i node-spotify-api
    [Instructions for Spotify](https://www.npmjs.com/package/node-spotify-api)
* Request
    * npm i request
    [Instructions for Request](https://www.npmjs.com/package/request)
* OMBD API
    [OMBD API Page](http://www.omdbapi.com/)


##How to Obtain Keys

*Link to Twitter API
