require("dotenv").config();

var fs = require('fs')
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment")
var spotify = new Spotify(keys);
var commandOne = process.argv[2];
var commandTwo = process.argv[3];


function concertSearch() {
  var artist = commandTwo;

  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(queryURL)
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log("Venue: " + response.data[i].venue.name);
        console.log("Location: " + response.data[i].venue.country);
        console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
      }

    })
}

function movieSearch() {
  var movie = commandTwo;

  let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
  axios.get(queryURL)
    .then(function (response) {
      //    Then we print out the imdbRating
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[2].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });
}

function spotifySearch(commandTwo) {
  spotify.search({
    type: 'track',
    query: commandTwo
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    songArtist = data.tracks.items[0].artists[0].name;
    songTitle = data.tracks.items[0].name;
    songURL = data.tracks.items[0].preview_url;
    songAlbum = data.tracks.items[0].album.name;

    console.log(`\n Song Title: "${songTitle}"\n by: ${songArtist}\n Album: "${songAlbum}"\n Check it out here: ${songURL}`);

  });

}

function doWhat() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    commandTwo = dataArr[0];
    spotifySearch(dataArr[1]);
    // We will then re-display the content as an array for later use.

  });
}


function choices(commandOne) {
  switch (commandOne) {
    case "movies-this":
      movieSearch();
      break;

    case "concert-this":
      concertSearch();
      break;

    case "do-what-it-says":
      doWhat();
      break;

    case "spotify-this-song":
      spotifySearch(commandTwo);
      break;

  }
}

choices(commandOne);
