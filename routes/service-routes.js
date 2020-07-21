const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const moment = require('moment');

moment().format();

const Service = require('../models/service');

const Wilayas = require('../models/wilaya');

const Communes = require('../models/communes');

const User = require('../models/user');

// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

router.get('/', (req,res)=> {
    res.render('services/index')
})
router.get('/medecins', (req,res)=> {
    
    let path = "/services/show-doctors";
    Wilayas.find({}, (err,wilayas) => {
    
        res.render('services/select-wil', { wilayas: wilayas, path: path})

})
})

router.post("/show-doctors/:pageNo?", (req,res)=> {
    let infowil = req.body.wilaya.split('+');
    
    let pageNo = 1;
    if (req.params.pageNo){
        pageNo = parseInt(req.params.pageNo)
    }
    if (req.params.pageNo==0) {
        pageNo = 1
    }
    
    let q = {
        skip: 5 * (pageNo - 1),
        limit: 5
    }
    //find total records or documents
    let totalDocs = 0;
    Service.countDocuments({}, (err,total)=> {

    }).then ((response)=>{
        totalDocs = parseInt(response);
    Service.find({genre:"Medecin", wilaya: infowil[0]},{},q, (err,services) => {
        let arrServices = [];
        let arrSize = 3;
        for(var i = 0;i < services.length; i+=arrSize) {
            arrServices.push(services.slice(i, arrSize+i))
        }
        
        res.render('services/show-service', { 
            arrServices: arrServices,
            message: req.flash('info'),
            total: totalDocs,
            pageNo: pageNo,
            path: "/services/show-doctors/"+infowil[1]+"/"
        })
    });
}) 
})


router.get("/show-doctors/:infowil/:pageNo?", (req,res)=> {
    let infowil = req.params.infowil
    let pageNo = 1;
    if (req.params.pageNo){
        pageNo = parseInt(req.params.pageNo)
    }
    if (req.params.pageNo==0) {
        pageNo = 1
    }
    
    let q = {
        skip: 5 * (pageNo - 1),
        limit: 5
    }
    //find total records or documents
    let totalDocs = 0;
    Service.countDocuments({}, (err,total)=> {

    }).then ((response)=>{
        totalDocs = parseInt(response);
    Service.find({genre:"Medecin", wilaya: infowil},{},q, (err,services) => {
        
        let arrServices = [];
        let arrSize = 3;
        for(var i = 0;i < services.length; i+=arrSize) {
            arrServices.push(services.slice(i, arrSize+i))
        }
        res.render('services/show-service', { 
            arrServices: arrServices,
            message: req.flash('info'),
            total: totalDocs,
            pageNo: pageNo,
            path: "/services/show-doctors/"+infowil+"/"
        })
    });
}) 
})

router.get('/create', isAuthenticated, (req,res)=> {
   
    Service.findOne({user_id: req.user.id}, (err, serv)=> {
        
        if (!serv){
            let path = "/services/create";
            Wilayas.find({}, (err,wilayas) => {
                res.render('services/select-wil', { wilayas: wilayas, path: path})
            })
        }else{
            res.redirect('/')
        }
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
  if (!errors.isEmpty()) {
    
   req.flash('errors', errors.array())
   
   res.redirect('create')
   
    
  }else {
    
        if (req.body.service != 'Medecin'){
            req.body.spec = ""
        }
        let newService = new Service({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        wilaya: req.body.wilaya_id,
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
        avatar:req.user.avatar,
        created_at: Date.now()
    })
    
    
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

router.get('/dashboard',isAuthenticated, (req,res) => {

    Service.findOne({user_id: req.user.id}, (err, service)=> {
        //console.log(service)
        if(!err){
            res.render('services/dashboard', { service: service })
        }else{
            console.log(err)
        }
        
    })
    
})

router.get('/edit/:id',(req, res) =>{
    Service.findOne({_id: req.params.id}, (err, service)=> {
        if(!err){
            res.render('services/edit-service', 
            { service: service,
             errors: req.flash('errors'),
             message: req.flash('info')
            })
        }else{
            console.log(err)
        }
        
    })
})


router.get('/update/:id',(req, res) =>{
    Service.findOne({_id: req.params.id}, (err, service)=> {
    if (!err){ 
       Wilayas.findOne({_id: service.wilaya}, (err,wilaya) => {
           //console.log(wilaya)
          if (!err){
            Communes.find({refwil: service.wilaya}, (err,communes) => {
                //console.log(communes)
                if(!err){
                    res.render('services/update-service', 
                    {   service: service,
                        wilayas: wilaya,
                        communes : communes,
                        errors: req.flash('errors'),
                        message: req.flash('info')
                    })
                }else{
                    console.log(err)
                }
            })
          }
       })
    }   
        
    })
})

router.post('/update', isAuthenticated, [
    body('nom').isLength({min: 3}).withMessage('Name should be more than 3'),
    body('prenom').isLength({min: 3}).withMessage('Prenom should be more than 3'),
    body('adresse').isLength({min: 5}).withMessage('Adresse should be more than 5'),
    body('tel').isLength({min: 5}).withMessage('telephone should be more than 5'),
    body('mobile').isLength({min: 5}).withMessage('mobile should be more than 5'),
] ,(req, res) => {
    const errors = validationResult(req);
    //console.log(errors)
    if (!errors.isEmpty()) {
      
     req.flash('errors', errors.array())
     
     
     res.redirect('/services/update/' + req.body.id)
     
      
    }else {
        if (req.body.service != 'Medecin'){
            req.body.spec = ""
        }
        let newFields = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            adresse: req.body.adresse,
            wilaya: req.body.wilaya_id,
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
            avatar:req.user.avatar,
            created_at: Date.now()
     }
     let query = {_id: req.body.id}
 
     Service.updateOne(query, newFields, (err)=> {
         if(!err) {
             req.flash('info', " The event was updated successfuly"),
             res.redirect('/services/dashboard')
         } else {
             console.log(err)
         }
     })
    }    
})

router.get('/editProfile/:id',(req, res) =>{
    Service.findOne({_id: req.params.id}, (err, service)=> {
        if(!err){
            res.render('services/edit-profile', 
            { service: service,
             /*eventDate: moment(event.date).format('YYYY-MM-DD'), */
             errors: req.flash('errors'),
             message: req.flash('info')
            })
        }else{
            console.log(err)
        }
        
    })
})
module.exports = router;