const mongoose = require("mongoose");

const communeSchema = new mongoose.Schema({
    nomcommune: {
        type: String,
        required: true
    },
    refwil: {
        type: String, 
        required: true}, 
     
});

let Commune = mongoose.model('Commune', communeSchema, 'communes');
module.exports = Commune