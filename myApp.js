var express = require('express');
var app = express();

console.log('App is starting'); 

const middleware = (req, res, next) => {
    req.time = new Date()
    req.time = req.time.toString();
    next();
};
  
app.get('/now', middleware, (req,res) => {
    res.send({time: req.time}); 
});



module.exports = app;
