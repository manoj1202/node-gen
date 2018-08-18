var express = require('express');
var router = express.Router();
var multer = require("multer");
var upload = multer({dest: "./uploads"});

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
    var profileImage = 'noimage.jpeg';
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
    console.log('No Errors')
  }
});

module.exports = router;
