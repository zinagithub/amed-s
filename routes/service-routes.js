const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const moment = require('moment');

moment().format();

const Service = require('../models/service');

const Wilayas = require('../models/wilaya');



// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

router.get('/', (req,res)=> {
    res.render('services/index')
})

router.get('/create', isAuthenticated, (req,res)=> {
   // res.render("services/create")
   Wilayas.find({}, (err,wilayas) => {
    
    res.render('services/select-wil', { wilayas: wilayas})
})
   
})

router.post('/create', (req,res)=> {
    //console.log(req.body.wilaya.split('+'));
    let infowil = req.body.wilaya.split('+');
    res.render('services/create', {infowil: infowil})
})

module.exports = router;