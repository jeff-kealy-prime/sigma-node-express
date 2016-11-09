// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A.",
    Date: new Date()
  }
];

// Routes
app.post('/songs', function(req, res) {// adds song
  // req.body is supplied by bodyParser above
  console.log("REQ body: ", req.body);
  var newSong = req.body;
  var isDuplicate = false;
  //console.log(songs[0].artist);
  for (var i = 0; i < songs.length; i++) {
    if (newSong.title == songs[i].title) {
       isDuplicate = true;

    }
  }
  if(isDuplicate == true || newSong.title == ""){
    res.sendStatus(400);
  }else{
  //console.log(songs.artist);
  newSong.dateAdded = new Date();
  songs.push(newSong);

  console.log(songs);
  // created new resource
  res.sendStatus(201);
  }
});

app.get('/songs', function(req, res) {//gets all the songs
  //console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  //console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
