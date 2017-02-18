save_image=require('../helper/saveimage.js');

module.exports = function(logger,bodyParser,model,mkdirp){
    return function(req,res){
        console.log(req.body.studentid);
        student_id=req.body.studentid;
        password=student_id+"@123";
        dir=__dirname+'/../model/images/students/'+student_id+'/';
        mkdirp(dir, function (err) {
            if (err) logger.log('error','Creating directory for student '+student_id);
            else logger.log('info','Created directory for Student '+student_id);
        });
        image_path=dir+'photo';
        save_image(String(req.body.image),image_path,logger);
        ration_path=dir+'ration';
        save_image(String(req.body.ration),ration_path,logger);

        var student={
            "name":req.body.name,
            "Class":req.body.class,
            "section":req.body.section,
            "rollno":req.body.rollno,
            "studentid":student_id,
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
        };

        model.students.findOne({'name':req.body.name,'phone':req.body.phone}).exec()
            .then(function(doc){
            if(doc==null){
                return model.students.create(student);
            }else{
                res.send("Student already found");
            }
        })
            .then(function(doc){
            logger.log('info','Student Registered'+student_id);
            res.json({ success: true });
        })
            .catch(function(err){
            logger.log('error','Error in Registering Student'+student_id);
        });
    }
}