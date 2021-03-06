var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

var bodyParser = require('body-parser'); 

const middleware = (req, res, next) => {
    req.time = new Date()
    req.time = req.time.toString();
    next();
};
  
app.get('/now', middleware, (req,res) => {
    res.send({time: req.time}); 
});

app.post('/name', (req,res) => {
    let first = req.body.first; 
    let last = req.body.last; 
    res.json( { name: `${first} ${last}` } );  
}); 

module.exports = app;
