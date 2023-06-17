const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("bcrypt");
const User = require("../models/user");
const dotenv = require("dotenv").config();


passport.use(
  new googleStrategy(
    {
      
        clientID: "245354714397-i77vnd2mr0sqn6q9sbd2nih5qkhhsa64.apps.googleusercontent.com",  
        clientSecret:  "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",  
        callbackURL:   "http://localhost:8000/users/auth/google/callback",
    
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy passport", err);
          return;
        }
        console.log(profile);

        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy passport",
                  err
                );
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
