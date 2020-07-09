const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/database');
const bodyParser=require("body-parser");
const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');



app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules'));


app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.get('/', (req, res) => {
    res.render("index");
} )

const Port = 3000;
app.listen(Port, (req,res) => {
    console.log('Application is running at 3000 port!')
})