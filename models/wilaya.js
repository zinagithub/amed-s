const mongoose = require("mongoose");
const wilayaSchema = new mongoose.Schema({
    nomwilaya: {
        type: String,
        required: true
    } 
     
});

let Wilaya = mongoose.model('Wilaya', wilayaSchema, 'wilayas');
module.exports = Wilaya