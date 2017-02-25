save_image=require('../helper/saveimage.js');

module.exports = function(logger,bodyParser,model,mkdirp){
    return function(req,res){
        //console.log(req.body.teacherid);
        teacher_id=req.body.teacherid;
        password=teacher_id+"@123";
        dir=__dirname+'/../model/images/teachers/'+teacher_id+'/';
        mkdirp(dir, function (err) {
            if (err) logger.log('error','Creating directory for teacher '+teacher_id);
            else logger.log('info','Created directory for Teacher '+teacher_id);
        });
        image_path=dir+'photo';
        save_image(String(req.body.image),image_path,logger);
        document_path=dir+'document';
        save_image(String(req.body.ration),document_path,logger);

        var teacher={
            "name":req.body.name,
            "teacherid":teacher_id,
            "password":password,
            "gender":req.body.gender,
            "image":image_path,
            "dob":req.body.dob,
            "address":req.body.address,
            "document_proof":document_path,
            "fathers_name":req.body.father,
            "nominee":req.body.nominee,
            "pan_card_number":req.body.pancard,
            "total_experience":req.body.experience,
            "subject":req.body.subject,
            "degree":req.body.degree,
            "position":req.body.position,
            "phone":req.body.phone,
            "email":req.body.email            
        };

        model.teachers.findOne({'name':req.body.teacherid,'phone':req.body.phone}).exec()
            .then(function(doc){
            if(doc==null){
                return model.teachers.create(teacher);
            }else{
                res.send("Teacher already found");
            }
        })
            .then(function(doc){
            logger.log('info','Teacher Registered'+teacher_id);
            res.json({ success: true });
        })
            .catch(function(err){
            logger.log('error','Error in Registering teacher'+teacher_id);
        });
    }
}