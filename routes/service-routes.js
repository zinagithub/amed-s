const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const moment = require('moment');

moment().format();

const Service = require('../models/service');

const Wilayas = require('../models/wilaya');

const Communes = require('../models/communes');

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
    
    let infowil = req.body.wilaya.split('+');
    Communes.find({refwil: infowil[0]}, (err,communes) =>{
        res.render('services/create', {infowil: infowil, communes: communes, user:req.user})
    })
    
})

router.post('/save',isAuthenticated, [
    body('nom').isLength({min: 3}).withMessage('Name should be more than 3'),
    body('prenom').isLength({min: 3}).withMessage('Prenom should be more than 3'),
    body('adresse').isLength({min: 5}).withMessage('Adresse should be more than 5'),
    body('tel').isLength({min: 5}).withMessage('telephone should be more than 5'),
    body('mobile').isLength({min: 5}).withMessage('mobile should be more than 5'),
] , (req,res)  => {

const errors = validationResult(req);
//res.send(req.body)
//res.locals.user = req.user || null;
console.log("user: ", req.user)
console.log(errors)
  if (!errors.isEmpty()) {
    
   req.flash('errors', errors.array())
   
   res.redirect('create')
   
    
  }else {
    //res.send(req.body)
         let newService = new Service({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        telephone: req.body.tel,
        mobile: req.body.mobile,
        siteWeb: req.body.site,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        description: req.body.description,
        specialite: req.body.spec,
        genre: req.body.service,
        user_id: req.user.id,
        created_at: Date.now()
    })
    
    //console.log(newService)
    newService.save( err => {
        if (!err){
            console.log('Service saved');
            req.flash('info', ' The Service was created successfuly')
            res.redirect('/')
        }
        else {
            console.log(err)
        }
    })
    }
    
   
})




module.exports = router;