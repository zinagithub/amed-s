const express = require('express');

const router = express.Router();

const User = require('../models/user');

const passport = require('passport')

var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images')
    },
   
    filename: function (req, file, cb) {
        
        var fileObj = {
          "image/png": ".png",
          "image/jpeg": ".jpeg",
          "image/jpg": ".jpg"
        };
        if (fileObj[file.mimetype] == undefined) {
          cb(new Error("file format not valid"));
        } else {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + fileObj[file.mimetype])
        }
      }
  })
  
  var upload = multer({ storage: storage })



// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

//login user
router.get('/login', (req,res)=> {
    res.render('users/login', {
        error: req.flash('error')
    })
})

// login post request 
router.post('/login',
    passport.authenticate('local.login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true })
)

//sign up user
router.get('/signup', (req,res)=> {
    res.render('users/signup', {error: req.flash('error')})
})

// sign up post request 
router.post('/signup',
  passport.authenticate('local.signup', {
      successRedirect: '/users/profile',
      failureRedirect: '/users/signup',
      failureFlash: true 
}))

//profile
router.get('/profile', isAuthenticated,(req,res)=> {
    res.render('users/profile', {success: req.flash('success')})
})

//logout user
router.get('/logout', (req,res)=> {
    req.logout();
    res.redirect('/users/login')
})


router.post('/uploadAvatar',upload.single('avatar'), (req,res)=> {
    let newFields = {
        avatar: req.file.filename
    }
    User.updateOne({_id: req.user._id}, newFields,(err) => {
        if (!err){
            res.redirect('/users/profile')
        }
    })
})
module.exports = router;