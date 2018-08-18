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

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("newUser.password", salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}