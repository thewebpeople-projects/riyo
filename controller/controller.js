var models = require('../model/model.js');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var logger=require('./logger.js');



module.exports = function (app,io){
    
    var save_image= function(tmp_path,save_path){
        var tmp=String(tmp_path);
        var target=path.resolve(save_path);
        source=fs.createReadStream(tmp);
        dest=fs.createWriteStream(target);
        source.pipe(dest);
        source.on('end',function(){
            fs.unlink(tmp, function(err){
                if(err) throw err;
            });
            res.send(target);
        });
        source.on('error',function(){
            console.log("Error");
        });
    }
    /*
    Description - Register Students
    URL - /register/students?name={search_string}
    */
    app.post('/register/students',(req,res)=>{
        //student_id=school+
        password=student_id+"@123";
        dir=__dirname+'/../model/images/stuents/'+student_id+'/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        image_path=dir+'photo';
        save_image(image_path);
        ration_path=dir+'ration';
        save_image(ration_path);
        
        var student={
            "name":req.body.name,
            "Class":req.body.class,
            "section":req.body.section,
            "rollno":req.body.rollno,
            //"studentid":student_id,
            "password":password,
            "gender":req.body.gender,
            "image":image_path,
            "dob":req.body.dob,
            "address":req.body.address,
            fathers_name:req.body.father,
            mothers_name:req.body.mother,
            ration_card_proof:ration_path,
            aadharno:req.body.aadharno,
            phone:req.body.phone,
            email:req.body.email            
        }
        
//        model.students.findOne({'name':req.body.name,'phone':eq.body.phone},(err,doc)=>{
//            if(err){
//                logger.log('error','Error in Registering student-finding them to verify for duplicate document');; 
//            }
//            if(doc == null){
//                model.students.create(student,function(err,doc){
//                    if(err) logger.log('error','Error in Registering Student');
//                    else{
//                        logger.log('info','Student Registered'+student_id);
//                        res.send("success");
//                    }
//                });
//            }else{
//                res.send("Student already found");
//            }
//        });
        
        model.students.findOne({'name':req.body.name,'phone':eq.body.phone}).exec()
        .then(function(doc){
            return model.students.create(student);
        })
        .then(function(doc){
            logger.log('info','Student Registered'+student_id);
            res.send("success");
        })
        .catch(function(err){
            logger.log('error','Error in Registering Student'+student_id);
        });
    });
}