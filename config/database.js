//Set up mongoose connection
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://zinaMongo:z**m$$1973@cluster0-typlj.mongodb.net/ameds?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
