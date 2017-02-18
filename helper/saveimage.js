var fs = require('fs');
//var logger=require('../../logger/logger.js');
var path = require('path');

module.exports = function(tmp_path,save_path,logger){
    return function(tmp_path,save_path){
        var tmp=tmp_path;
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
}