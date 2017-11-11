const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(
  new GoogleStrategy({
    //options for google startegy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret : keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    //This executes after the middleware call in the route of callbackURL defined above.

    //Here we will get the profile details from google,
    //need to retrieve the user and check in our mongodb

    console.log('Passport callback function fired.');
    console.log(profile);
  })
)
