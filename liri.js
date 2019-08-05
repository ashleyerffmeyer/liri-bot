require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// node liri.js concert-this <artist/band name here>
var artist = 

var bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// node liri.js spotify-this-song <song name here>

// node liri.js movie-this <movie name here>

// node liri.js do-what-it-says