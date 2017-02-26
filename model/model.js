var mongoose = require('mongoose');
var config=require('../config');
mongoose.Promise=require('bluebird');

var Schema = mongoose.Schema;

mongoose.connect(config.database);



mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});

//mongoose.connect('mongodb://localhost/mongodb');

module.exports.students= mongoose.model('students',new Schema({
    name:String,
    Class:String,
    section:String,
    rollno:String,
    studentid:String,
    password: String,
    gender: String,
    image: String,
    dob:String,
    address:String,
    fathers_name:String,
    mothers_name:String,
    ration_card_proof:String,
    aadharno:String,
    phone:String,
    email:String
},{strict: false}));

module.exports.teachers= mongoose.model('teachers',new Schema({
    name:String,
    teacherid:String,
    password: String,
    gender: String,
    image: String,
    dob:String,
    address:Object,
    document_proof:String,
    fathers_name:String,
    nominee:String,
    //nominee_proof:String,
    pan_card_number:String,
    //pancard_proof:String,
    total_experience:String,
    subject:String,
    degree:String,
    position:String,
    phone:String,
    email:String
},{strict: false}));

module.exports.nonteaching= mongoose.model('nonteaching',new Schema({
    name:String,
    password: String,
    nonteachingid:String,
    gender: String,
    image: String,
    dob:String,
    address:Object,
    document_proof:String,
    fathers_name:String,
    nominee:String,
    //nominee_proof:String,
    total_experience:String,
    position:String,
    phone:String,
    email:String
},{strict: false}));

module.exports.messages=mongoose.model('messages',new Schema({
    content:String,
    from:String,
    to:String,
    datetime:String
}));

module.exports.marks=mongoose.model('marks',new Schema({
    student_name:String,
    Class:String,
    section:String,
    rollno:String,
    scores:Object
}));

//module.exports.admin=mongoose.model('admin',new Schema({
//    username:"admin",
//    password:"password",
//    id:String
//}));
