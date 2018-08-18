var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

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

module.exports.getUserById =function(id,callback){
    User.findById(id,callback)
}
module.exports.getUserByUsername = function(username,callback){
    var query = {username : username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatepassword, hash, callback){
    bcrypt.compare(candidatepassword, hash, function(err, isMatch) {
        callback(null, isMatch)
    });
}

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("newUser.password", salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}