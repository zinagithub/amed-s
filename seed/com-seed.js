const db = require('../config/database');
const Commune = require('../models/communes');

let arrcommune = [
    new Commune({
        nomcommune: "Alger-Centre",
        refwil: "5f0c9eaabfe53af61490b594"
    }),
    new Commune({
        nomcommune: "Sidi M'Hamed",
        refwil: "5f0c9eaabfe53af61490b594"
    }),
    new Commune({
        nomcommune: "El Madania",
        refwil: "5f0c9eaabfe53af61490b594"
    }),
    new Commune({
        nomcommune: "Belouizdad",
        refwil: "5f0c9eaabfe53af61490b594"
    }),
    new Commune({
        nomcommune: "Bab El Oued",
        refwil: "5f0c9eaabfe53af61490b594"
    }),
    new Commune({
        nomcommune: "Sétif",
        refwil: "5f0c9eaabfe53af61490b597"
    }),
    new Commune({
        nomcommune: "Ain Arnat",
        refwil: "5f0c9eaabfe53af61490b597"
    }),
    new Commune({
        nomcommune: "Ain-El-Kebira",
        refwil: "5f0c9eaabfe53af61490b597"
    }),
    new Commune({
        nomcommune: "El-Eulma",
        refwil: "5f0c9eaabfe53af61490b597"
    }),
    
];


arrcommune.forEach(com => {
    com.save( err => {
        if (!err){
            console.log("Commune successefuly saved! ")
        }else {
            console.log("error! ", err)
        }
    })
} )