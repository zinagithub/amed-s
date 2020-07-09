const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');

//saving user object in the session

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


passport.use('local.signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
}, (req, username, password, done) => {
    
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'Passwords do not match'))
    } else {
        User.findOne({email: username}, (err,user)=> {
            if(err) {
                return done(err)
            }
            if(user) {
                return done(null, false, req.flash('error', 'Email already used'))
            }

            if (!user) {
                //create user
                let newUser = new User()
                newUser.email = req.body.email
                newUser.password = newUser.hashPassword(req.body.password)
                newUser.save ((err,user)=> {
                    if(!err) {
                        return done(null, user, req.flash('success', 'User Added'))
                    } else {
                        console.log(err)
                    }
                })
            }
        })
    }

}))