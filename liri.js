// All required node modules needed to run functions below

// Sets environmental variables to global 'process.env' object in node
require("dotenv").config();

// Calls API keys for Spotify
var keys = require("./keys.js");

// Moment module
var moment = require('moment');

// Axios module
var axios = require("axios");

// Spotify module
var Spotify = require('node-spotify-api');

// Reads/writes files
var fs = require("fs");

// Function to run "node liri.js concert-this <artist/band name here>" command

// Creates concertThis function that passes through bandName
var concertThis = function (bandName) {

    // Variable building the query URL for Bands In Town
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    // Axios get request
    axios.get(bandQueryURL)

        // Then get a response and do the following actions
        .then(function (response) {
            console.log("----------------------------------------------------");
            console.log("See below for info about " + bandName);
            console.log("----------------------------------------------------");
            console.log("Artist(s): " + response.data[0].lineup);
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            var concertDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
            console.log("Event Date: " + concertDate);
            console.log("----------------------------------------------------");
        })

        // console.log "error" if there is a error
        .catch(function (error) {
            console.log("error");
        });
};

// Functions to run "node liri.js spotify-this-song '<song name here>' " command

// Function to get the name of the artist
var getArtistName = function (artist) {
    return artist.name;
}

// Creates spotifyThisSong function that passes through songName
var spotifyThisSong = function (songName) {

    // If a song name is not provided, populate the command with 'The Sign' by Ace of Base
    if (!songName) {
        songName = 'The Sign';
    }
    // Otherwise, use the song name provided by user
    songName = songName;

    // Creates variable spotify to create Spotify keys
    var spotify = new Spotify(keys.spotify);

    // Use node spotify api package call
    spotify.search({ type: 'track', query: songName }, function (err, data) {

        // If there is an error return the following info
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // Otherwise, console.log the following search results
        var songs = data.tracks.items;
        console.log("----------------------------------------------------");
        console.log("See below for " + songName + " search results.");
        console.log("----------------------------------------------------");
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Artist(s): " + songs[i].artists.map(getArtistName));
            console.log("Song Name: " + songs[i].name);
            console.log("Preview Link: " + songs[i].href);
            console.log("Album Name: " + songs[i].album.name);
            console.log("----------------------------------------------------");

        }
    });
};

// Function to run  "node liri.js movie-this '<movie name here>' " command

// Creates movieThis function that passes through movieName
var movieThis = function (movieName) {

    // If a movie name is not provided, populate the command with the movie "Mr. Nobody"
    if (!movieName) {
        movieName = 'Mr Nobody';
    }

    // Otherwise, use the movie name provided by user
    movieName = movieName;

    // Variable building the query URL for OMBD
    var omdbQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Axios get request
    axios.get(omdbQueryUrl)

        // Then get a response and do the following actions
        .then(function (response) {
            console.log("----------------------------------------------------");
            console.log("See below for info about " + movieName);
            console.log("----------------------------------------------------");
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
            console.log("Country of Origin: " + response.data.Country);
            console.log("Movie Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Featured Actors: " + response.data.Actors);
            console.log("----------------------------------------------------");
        })

        // console.log the following if there is a error
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};


// Function to run "node liri.js do-what-it-says" command

// Creates doWhatItSays function
var doWhatItSays = function () {

    // Read random.text file with readFile method
    fs.readFile('random.txt', 'utf8', function (err, data) {

        // If there's an error, throw err
        if (err) throw err;

        // Creates variable that splits data at comma
        var dataArr = data.split(',');

        // If the data array length is 2, pick both indices in data array
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        }

        // Otherwise, if the data array lenght is 1, pick just one index in the data array
        else if (dataArr.length == 1) {
            pick(dataArr[0]);
        };
    });
};

// Creates pick function to swtich between user input cases 
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'concert-this':
            concertThis(functionData);
            break;

        case 'spotify-this-song':
            spotifyThisSong(functionData);
            break;

        case 'movie-this':
            movieThis(functionData);
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;

        default:
            console.log('LIRI does not know this');
    }
}

// Creates runThis function that runs pick function with 2 arguments
var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
}

// Runs runThis function with arguments input by user
runThis(process.argv[2], process.argv[3]);