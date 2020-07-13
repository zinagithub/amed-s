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
        type: String,
        required: true
    }, 
    commune: {
        type: String,
        required:true
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
        required: true
    } 
});

let Service = mongoose.model('Services', serviceSchema, 'services');
module.exports = Service