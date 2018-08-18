var mongoose = require('mongoose');

mongoose.connect('mangodb://localHost/test');

var db =mongoose.connection;

//user Schema
var UserSchema = mongoose.Schema({
    usernamr:{
        type: string,
        index: true
    },
    password : {
        type : string
    },
    email : {
        type : string
    },
    name : {
        type : string
    },
    profileimage : {
        type: string
    }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser, callback){
    newUser.save(callback);
}