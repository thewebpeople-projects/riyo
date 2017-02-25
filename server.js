var express=require('express');
var app=express();
var apiRoutes = express.Router();
var http=require('http').Server(app);
var ip = require('ip');
var config=require('./config.js');
//var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
//app.use(expressJWT({secret:String(config.secret)}).unless({path:['/login']}));

app.use(express.static('./')); 


require("./controller/controller.js")(app,jwt,apiRoutes);

http.listen(8080,function(){
    console.log("Node Server is setup and it is listening on http://"+ip.address()+":8080");
});