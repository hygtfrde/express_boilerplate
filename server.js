var bGround = require('fcc-express-bground');
var myApp = require('./myApp');
require('dotenv').config(); 
var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(__dirname + '/public')); 

app.use( (req, res, next) => {
  var userInfo = req.method + " " + req.path + " - " + req.ip;
  console.log(userInfo);
  next();
}); 

app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath); 
  // res.send('Hello Express'); 
}); 

app.get('/json', (req,res)=>{
  if(process.env.MESSAGE_STYLE==='uppercase'){
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});

app.get('/:word/echo', (req,res) => {
  const { word } = req.params
  res.json( { echo: word } )
}); 


var port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function(){
  bGround.log('Node is listening on port '+ port + '...')
});

