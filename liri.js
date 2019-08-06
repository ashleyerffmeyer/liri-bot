// All requirements
require("dotenv").config();

var keys = require("./keys.js");

var moment = require('moment');

var axios = require("axios");

var Spotify = require('node-spotify-api');

var fs = require("fs");

// node liri.js concert-this <artist/band name here>

var concertThis = function (bandName) {
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(bandQueryURL)
        .then(function (response) {
            console.log("----------------------------------------------------");
            console.log("Artist(s): " + response.data[0].lineup);
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            var concertDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
            console.log("Event Date: " + concertDate);
            console.log("----------------------------------------------------");
        })
        .catch(function (error) {
            console.log("error");
        });
};

// Functions for node liri.js spotify-this-song <song name here>

var getArtistName = function (artist) {
    return artist.name;
}

var spotifyThisSong = function (songName) {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
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

// Functions for node liri.js movie-this '<movie name here>'

var movieThis = function (movieName) {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    //var movieName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s

    /**for (var i = 2; i < nodeArgs.length; i++) {
    
            if (i > 2 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
    
            }
    }**/

    // Then run a request with axios to the OMDB API with the movie specified
    var omdbQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(omdbQueryUrl).then(
        function (response) {
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


// Function for node liri.js do-what-it-says

var doWhatItSays = function () {

    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        }
        else if (dataArr.length == 1) {
            pick(dataArr[0]);
        };
    });
};

// Functions

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

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
}

runThis(process.argv[2], process.argv[3]);