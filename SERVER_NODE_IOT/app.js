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

// Il faut attendre que la board soit initialisée avant de get les routes. Voir cmd -> Repl : Initialized
board.on("ready", function() {
  //on get la route /led
  app.get('/led', function(req, res){
    //rendu du layout
    res.render('index.ejs'); 
    //création du socket de la page
    io.sockets.on('connection', function (socket) {
      //Quand un client se connecte, on lui envoie un message
      socket.emit('message', 'Vous êtes bien connecté !'); 
    
      //init des leds
      var led1 = new five.Led(7);
      var led2 = new five.Led(3);
      
      //On récupère les actions de l'utilisateur et on renvoie les infos
      socket.on('led1On', function(){
        led1.blink(500);
        console.log("Led 1 Allumée");
      });  

      socket.on('led2On', function(){
        led2.blink(500);
        console.log("Led 2 Allumée");
      });  

      socket.on('led1Off', function(){
        led1.stop().off();
        console.log("Led 1 éteinte");
      });  

      socket.on('led2Off', function(){
        led2.stop().off();
        console.log("Led 2 éteinte");
      });  
    });
  }); 
//   app.get('/ultrasonic', function(req,res){
//     var proximity = new five.Proximity({
//       controller: "HCSR04",
//       pin: 7
//     });
//     res.render('index.ejs');
//     //création du socket de la page
//     io.sockets.on('connection', function (socket) {
//       proximity.on("data", function() {
//         var distance = this.cm;
//         console.log("Proximity: ");
//         console.log("  cm  : ", this.cm);
//         console.log("  in  : ", this.in);
//         console.log("-----------------");
//         socket.emit('cm', distance);
//       });
    
//       proximity.on("change", function() {
//         console.log("The obstruction has moved.");
//       });
//     });
//   });
// });

// app.get('/temperature', function(req, res){
//   res.render('index.ejs');
 
//     thermometer.once("data", function (err, data) {
//       console.log(data.celsius + "°C");
//   });

//     io.sockets.on('connection', function (socket) {
//       // Quand un client se connecte, on lui envoie un message
//       socket.emit('message', 'Vous êtes bien connecté !'); 
//     // This requires OneWire support using the ConfigurableFirmata
//     thermometer.on("change", function() {
//       console.log(this.celsius + "°C");
//       socket.emit('temp', this.celcius);
//       // console.log("0x" + this.address.toString(16));
//     });
//   });
});

  