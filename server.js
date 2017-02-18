var express=require('express');
var app=express();
var http=require('http').Server(app);
var ip = require('ip');
var config=require('./config.js');
var jwt = require('jsonwebtoken');
app.set('superSecret', config.secret);

app.use(express.static('./')); 


require("./controller/controller.js")(app,jwt);

http.listen(8080,function(){
    console.log("Node Server is setup and it is listening on http://"+ip.address()+":8080");
});