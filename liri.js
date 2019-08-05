require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// node liri.js concert-this <artist/band name here>
var artist = process.argv[2];

var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios
    .get(bandsURL)
    .then(function (response) {

        console.log(response.data);
    })
    .catch(function (error) {
        console.log("error");
    });

// node liri.js spotify-this-song <song name here>

// node liri.js movie-this '<movie name here>'

// node liri.js do-what-it-says