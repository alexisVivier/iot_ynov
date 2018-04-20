var http = require('http');
var path = require('path');
var fs = require('fs');
var io = require('socket.io').listen(server);
var express = require('express');
var bodyParser = require("body-parser"); 
var mongoose = require('mongoose'); 

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//URL de notre base
var urlmongo = "mongodb://alexis_v:@ds012345-a0.mlab.com:56789,ds012345-a1.mlab.com:56790/iot_ynov?replicaSet=rs-ds012345"; 
// Nous connectons l'API à notre base de données
mongoose.connect(urlmongo, (err) => {
    if (err) throw err;
    console.log("Connected to Database");
    }
);

var tempSchema = mongoose.Schema({  
    lieu: String,
    temperature: Number
  });
  var Temp = mongoose.model('Temperature', tempSchema);
  

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.route('/')  
    .get(function(req, res){
      Temp.find(function(err, temps){
        if(err){
          res.send(err);
        }
        res.send(temps);
      });
      
    })
    .post(function(req, res){
        var temp = new Temp();
        temp.lieu = "Nantes"
        temp.temperature = 25;
        temp.save(function(err){
          if(err){
            res.send(err);
          }
          res.send({message : 'temperature added'});
        })
    }); 

app.use(router);
var server = app.listen(3000);



  