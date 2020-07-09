const express = require('express');

const router = express.Router();

const User = require('../models/user');

const passport = require('passport')

//login user
router.get('/login', (req,res)=> {
    res.render('users/login')
})

// login post request 
router.post('/login', (req,res)=> {
    res.json('login in user ...')
})

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
router.get('/profile', (req,res)=> {
    res.render('users/profile')
})


//logout user
router.get('/logout', (req,res)=> {
    res.json("logout...")
})

module.exports = router;