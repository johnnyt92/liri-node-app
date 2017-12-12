var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request')
var fs = require('fs');

var action = process.argv[2]
var input = process.argv[3]

var omdbapiKey = '84e56454'

    switch (action) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            omdbi();
            break;

        case "do-what-it-says":
            textFile();
            break;
    }


function myTweets() {
var t = require('./keys')
var tKeys = new twitter(t);

var params = {
    screen_name: 'jolocoaa',
    count: 20
};

tKeys.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
    console.log("Error")
    }
    else {
        for (var i = 0; i < tweets.length; i++) {
            var recentTweets = ('@' + params.screen_name + ' said ' + '"'+tweets[i].text +'"'+' on ' + tweets[i].created_at)
            console.log(recentTweets)
            
        }
    }
})
}

function spotifyThisSong() {

    var spotify = new Spotify({
        id: '5883431ae2aa46cbaca46b9f120b4935',
        secret: '26f8a63fed57473eb8c54258446cd963'
    });

    spotify.search({ type: 'track', query: input, limit: 3 }, function (err, data) {
        if (err) {
            console.log("Error")
        }

        else {
            var song = data.tracks.items;
            for (var i = 0; i < song.length; i++) {
                if (song[i]) {
                    var spotifyResults =
                        "Artist: " + song[i].artists[0].name + "\r\n" +
                        "Song: " + song[i].name + "\r\n" +
                        "Album: " + song[i].album.name + "\r\n" +
                        "Preview Url: " + song[i].preview_url + "\r\n" +

                        console.log(spotifyResults);
                }

            }
        }
    });
}

function omdbi() {

var title = input;

if(title === undefined){
    title = 'Mr. Nobody'
}
var url = 'http://www.omdbapi.com/?apikey=' + omdbapiKey + '&t=' + title + '&y=&plot=full&tomatoes=true&r=json';
    // console.log(title)
    request(url, function (error, response, body) {
        var movieStuff = [];
        // console.log(movieStuff)
        var movieData = JSON.parse(body);
        // console.log(movieData)

        movieStuff.push({
            'Title: ': movieData.Title,
            'Year: ': movieData.Year,
            'IMDB Rating: ': movieData.imdbRating,
            'Rotten Tomatoes Rating: ': movieData.tomatoRating,
            'Actors: ': movieData.Actors,
            'Country Where Movie is Produced: ': movieData.Country,
            'Language: ': movieData.Language,
            'Plot: ': movieData.Plot,
  
        })
  console.log(movieStuff)
    });

}

function textFile() {
fs.readFile('random.txt', "utf8", function(err,data) {
    console.log(data)
    if (err) {
        console.log(error)
    }
});

var textFile = data.split(", ");
console.log(textFile)

    if (textFile.length == 2) {
        pick(textFile[0], textFile[1]);
    } else if (textFile.length == 1) {
        pick(textFile[0]);
    }
}

