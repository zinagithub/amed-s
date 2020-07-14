const db = require('../config/database');
const Wilaya = require('../models/wilaya');

let arrWilaya = [
    new Wilaya({
        nomwilaya: "Adrar"
    }),
    new Wilaya({
        nomwilaya: "Chlef"
    }),
    new Wilaya({
        nomwilaya: "Laghouat"
    }),
    new Wilaya({
        nomwilaya: "Batna"
    }),
    new Wilaya({
        nomwilaya: "Béjaïa"
    }),
    new Wilaya({
        nomwilaya: "Biskra "
    }),
    new Wilaya({
        nomwilaya: "Béchar "
    }),
    new Wilaya({
        nomwilaya: "Blida"
    }),
    new Wilaya({
        nomwilaya: " Bouira"
    }),
    new Wilaya({
        nomwilaya: "Tamanrasset "
    }),
    new Wilaya({
        nomwilaya: "Tébessa"
    }),
    new Wilaya({
        nomwilaya: " Tiaret"
    }),
    new Wilaya({
        nomwilaya: "Tizi Ouzou"
    }),
    new Wilaya({
        nomwilaya: "Alger"
    }),
    new Wilaya({
        nomwilaya: "Djelfa"
    }),
    new Wilaya({
        nomwilaya: " Jijel"
    }),
    new Wilaya({
        nomwilaya: "Sétif"
    }),
    new Wilaya({
        nomwilaya: "Saïda"
    }),
    new Wilaya({
        nomwilaya: "Skikda"
    }),
    new Wilaya({
        nomwilaya: " Sidi Bel Abbès"
    }),
    new Wilaya({
        nomwilaya: "Annaba"
    }),
    

];


arrWilaya.forEach(wil => {
    wil.save( err => {
        if (!err){
            console.log("Wilaya successefuly saved! ")
        }else {
            console.log("error! ", err)
        }
    })
} )