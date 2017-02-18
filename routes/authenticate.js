module.exports = function(logger,bodyParser,model){
    return function(req,res){
        loginuser=req.body.loginuser;

        if(loginuser=="student"){
            // find the user
            model.students.findOne({studentid:req.body.username}).exec()
                .then(function(doc){
                if(!doc){
                    logger.log('error','Authentication failed. User not found '+req.body.username);
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                }else if(doc){
                    // check if password matches
                    if(doc.password != req.body.password){
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    }else{
                        //if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });

                        res.json({
                            success: true,
                            message: 'Authentication successful',
                            token: token
                        });
                    }
                }
            })
                .catch(function(err){
                logger.log('error','Error in authenticating Student'+req.body.username);
            });
        }
        else if(loginuser=="teacher"){
            // find the user
            model.teachers.findOne({teacherid:'req.body.username'}).exec()
                .then(function(doc){
                if(!doc){
                    res.json({ success: false, message: 'Authentication failed. User not found.' });
                }else if(doc){
                    // check if password matches
                    if(doc.password != req.body.password){
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    }else{
                        //if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });

                        res.json({
                            success: true,
                            message: 'Authentication successful',
                            token: token
                        });
                    }
                }
            })
                .catch(function(err){
                logger.log('error','Error in authenticating teacher'+req.body.username);
            });
        }
    }
}