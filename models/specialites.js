const mongoose = require("mongoose");

const specialiteSchema = new mongoose.Schema({
    nomspecialite: {
        type: String,
        required: true
    },
    
     
});

let Specialite = mongoose.model('Specialite', specialiteSchema, 'specialites');
module.exports = Specialite