const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../model/user');

passport.serializeUser((user, done)=> {
  console.log("in serialize user. The id is " + user.id);
  done(null, user.id);
});


passport.deserializeUser((id, done)=> {
  console.log("in deserialize user. The id is " + id);
  User.findById(id).then((user) => {
    done(null, user.id);
  })
  .catch((error) => {
    console.log("error in deserialize. " + error);
  });
});

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
    //console.log(profile);

    //retrieve user from database
    User.findOne({providerID:profile.id, provider:'Google'}).then((currentUser) => {

      if(currentUser) {
          console.console.log('Retrieved current user: ' + currentUser);
          done(null, currentUser); //the done method will invoke the passport.serializeUser method
      } else {
          new User({
              provider:'Google',
              providerID: profile.id,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName
          }).save().then((newUser) => {
              console.log('created new user: ' + newUser);
              done(null, newUser); //the done method will invoke the passport.serializeUser method
          })//end of success of save
          .catch((error) => {
              console.log(error);
          })//end of failure for save;
      }
    })//end of success for findOne
    .catch((error) => {
        console.log(error);
    })//end of failure for findOne;

  })//end of  GoogleStrategy
)//end of passport use
