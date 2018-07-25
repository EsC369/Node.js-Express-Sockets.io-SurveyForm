var express = require("express");
var app = express();
//Socket
var socket = require("socket.io");

// Static/Public files:
app.use(express.static(__dirname + "/public"));

// Views:
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

// Body Parser:
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Listening:
var server = app.listen(1337, function(){
  console.log("Running in localhost at port 1337");
});

// Socket Setup:
var io = socket(server);
io.on("connection", function(socket){
  console.log("made socket connection", socket.id)     
  socket.on("posting_form", function(data){
    result = {}
    for(var i=0; i<data.length; i++){
        result[data[i]["name"]] = data[i]["value"];
    }
    socket.emit("updated_message", result);
    socket.emit("random_number", {num: Math.floor(Math.random()*1000)+1});
  })
}); 



