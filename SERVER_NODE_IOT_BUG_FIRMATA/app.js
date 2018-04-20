var http = require('http');
var path = require('path');
var fs = require('fs');
var io = require('socket.io').listen(server);
var express = require('express');
var bodyParser = require("body-parser"); 
var five = require("johnny-five");

var board = new five.Board();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(3000);
var io = require('socket.io').listen(server);

board.on("ready", function() {
  var thermometer = new five.Thermometer({
    controller: "DS18B20",
    pin: 2
  });
});
app.get('/temperature', function(req, res){
  res.render('index.ejs');
 
    thermometer.once("data", function (err, data) {
      console.log(data.celsius + "°C");
  });

    io.sockets.on('connection', function (socket) {
      // Quand un client se connecte, on lui envoie un message
      socket.emit('message', 'Vous êtes bien connecté !'); 
    // This requires OneWire support using the ConfigurableFirmata
    thermometer.on("change", function() {
      console.log(this.celsius + "°C");
      socket.emit('temp', this.celcius);
      // console.log("0x" + this.address.toString(16));
    });
  });
  

});





  