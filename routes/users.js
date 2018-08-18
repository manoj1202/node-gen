var express = require('express');
var router = express.Router();
var multer = require("multer");
var upload = multer({dest: "./uploads"});
var passport = require("passport");
var LocalStrategy = require("passport-local").strategy;

var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{title : 'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login',{title : 'Login'});
});

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: "Invalid Username or Password"}),
  function(req, res) {
    req.flash("success", 'You are now logged in');
    res.redirect('/');
  });

  passport.use(new LocalStrategy(function(username,password, done){
    User.getUserByUsername(username, function(err,user){
      if(err) throw err;
      if(!user){
        return done(null,false,{message : "Unknown User"})
      }
      User.comparePassword(password,user.password,function(err, isMatch){
        if(err) return done(err)
        if(isMatch){
          return done(null,user);
        }else {
          return done(null,false,{message : "Invalid Password"});
        }
      })
    })
  }))

router.post('/register', upload.single("profileImage"), function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.password;
  var password2 = req.body.password2;

  if(req.file){
    console.log("uploading File..")
    var profileimage = req.file.filename;
  }else {
    console.log("No File Uploaded...")
    var profileimage = 'noimage.jpeg';
  }
  // Form validation
  req.checkBody("name", 'Name field is required').notEmpty();
  req.checkBody("email", 'Email field is required').notEmpty();
  req.checkBody("email", 'Email  is not valid').isEmail();
  req.checkBody("username", 'username field is required').notEmpty();
  req.checkBody("password", 'password field is required').notEmpty();
  req.checkBody("password2", 'password do not match ').equals(req.body.password);

  //Check Errors
  var errors = req.asyncValidationErrors();
  if(errors){
    console.log("errors")
    res.render('register', {
      errors : errors
    })
  }else {
    var newUser = new User({
      name:name,
      email:email,
      username: username,
      password: password,
      profileimage: profileimage
    })
    User.createUser(newUser, function(err, user){
      if(err) throw err
      console.log(user)
    })
    req.flash('succes', 'you are now registered and can login')
    res.location('/');
    res.redirect('/')
  }
});

module.exports = router;
