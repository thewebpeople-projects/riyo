var model = require('../model/model.js');
var bodyParser = require('body-parser');
var logger=require('../logger/logger.js');
var routeauth=require('../helper/routeauth.js');
var studentsroute=require('../routes/students.js');
var authenticate=require('../routes/authenticate.js');
var fs = require('fs');
var path = require('path');
var multer  = require('multer');
var mkdirp = require('mkdirp');


module.exports = function (app,jwt){
    app.use( bodyParser.json() );
    app.use(multer({ dest: path.resolve(__dirname+'/../model/images/users/'),inMemory: true, includeEmptyFields: true}).any());
    app.use(bodyParser.urlencoded({     
        extended: true
    }));
    /*
    Description - Authenticate User
    URL - /login?"username":{student_id},"password":{password}
    */
    app.post('/login',authenticate(logger,bodyParser,model,jwt));
    
    /*
    Description - Authenticate User
    URL - /register/students?"name":{name},"Class":{class},"section":{section},"rollno":{rollno},"studentid":{student_id},"password":{password},"gender":{gender},"image":image_path,"dob":{dob},"address":{address},fathers_name:{father},mothers_name:{mother},ration_card_proof:{ration_path},aadharno:{aadharno},phone:{phone},email:{email}
    */
    app.post('/register/students',studentsroute(logger,bodyParser,model,mkdirp));
    
    // route middleware to verify a token
    app.use(routeauth());

}