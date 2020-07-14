const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }, 
    prenom: {
        type: String,
        required: true
    }, 
    adresse: {
        type: String,
        required: true
    },
    wilaya: {
        type: String
    }, 
    commune: {
        type: String,

    },
    telephone: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    siteWeb: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    description: {
        type: String
    },
    user_id : {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String
        //enum: ['Pending', 'Rejected', 'Accepted'], default: 'Pending'
    },
    genre: {
        type: String
        //enum: ['Medecin', 'Paramedical', 'Pharmacie','Parapharmacie',"Labo d'Analyse",'Clinique'], default: ''
    },
    specialite: {
        type: String
    }
 
});

let Service = mongoose.model('Services', serviceSchema, 'services');
module.exports = Service