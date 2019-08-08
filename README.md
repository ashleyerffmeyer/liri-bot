# LIRI BOT 

Language Interpretation and Recognition Interface (LIRI) Bot is a command line node app that takes in user parameters and provides the user with data from Spotify, OMDB, and Bands In Town APIs.  

[Link to LIRI!](https://ashleyerffmeyer.github.io/liri-bot/) 

## Authors
Ashley Erffmeyer, with major support from KU's Coding Boot Camp staff members:
* Ryan LaRue (Instructor)
* Jenny Dean (TA)
* Jacqueline Kolze (TA)
* Eli Vargas (TA)
* Seth Willis (TA)

## Tools Used
* JavaScript
* Node.js
* Multiple node packages: 
  * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

   * [Chalk](https://www.npmjs.com/package/chalk)

## Prerequisites & Installations

In order to run this command line node app, first install node.js and npm. To install the app, clone this repository and use 'npm install' to gather dependencies specified in the package.json file (Node-Spotify-API, Axios, Moment, DotEnv, Chalk). 

You will need to create a .env file that will contain the necessary Spotify API keys. Your .env file should look like this:
      
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

Acquire your own access keys; the OMDB key is provided.

## Application Overview

The LIRI node app runs from the command line with the following command structure:

    $ node liri.js argument1 argument2

NOTE: DON'T FORGET TO PUT ARGUMENT2 IN QUOTES

## Instructions

### Bands In Town

Use the following command to run the Bands In Town API:

    $ node liri.js concert-this '<artist/band name here>'

The Bands In Town API is accessed using the `axios` package and renders the following information about the artist/band to the terminal:
* Name of venue
* Venue location
* Date of the Event (formatted as "MM/DD/YYYY" with moment)

![Image of Bands In Town Terminal Output](https://github.com/ashleyerffmeyer/liri-bot/blob/master/readme-images/bands-in-town.png)

### Spotify

Use the following command to run the Spotify API:

    $ node liri.js spotify-this-song '<song name here>'

The Spotify API will return search results for the song with the following information:
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

If the user does not provide a song for Argument2, the program will default to "The Sign" by Ace of Base.

![Image of Spotify Terminal Output](https://github.com/ashleyerffmeyer/liri-bot/blob/master/readme-images/spotify.png)

### OMDB

Use the following command to run the OMDB API:

     $ node liri.js movie-this '<movie name here>'

The OMDB API is accessed using the `axios` package and renders the following information about the movie to the terminal:
* Title of the movie
* Year the movie came out
* IMDB Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie

If the user does not provide a movie for Argument2, the program will default to 'Mr. Nobody.'

![Image of OMDB Terminal Output](https://github.com/ashleyerffmeyer/liri-bot/blob/master/readme-images/omdb.png)

### Read Commands from File

Use the following command to take the text inside of the `random.txt` file and then use the text to call one of LIRI's commands:

    $ node liri.js do-what-it-says

NOTE: `argument2` is not needed for this command

`random.txt` contains the following information: 

    spotify-this-song,"I Want it That Way" 

![Image of Read Commands from File Terminal Output](https://github.com/ashleyerffmeyer/liri-bot/blob/master/readme-images/file.png)