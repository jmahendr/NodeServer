var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function(req, res, next) {
  //nothing special here as we do not plan to have local users. Only federated users (login with service)
  console.log('Login invoked');
  res.send("success with login");
});

router.get('/logout', function(req, res, next) {
  //handle with passport
  console.log('Logout invoked.');
});


//Here is where the authenticate via google starts.
//the passport authenticate method uses the google stragtegy as defined in
//root/config/passport-setup.js

//The scope[] here defines what we ask google to share with us.
//In this case its the user 'profile'

//On permission grant in google, it will fire the redirct url
//as defined in google+api and the stragtegy.

//i.e. router.get('/google/redirect',..... below

router.get('/google', passport.authenticate('google', {
  scope:['profile'] //we plan to retrieve user profile  from google
}));



//Here we intercept the redirect from google
//This redirect will have a CODE sent from google as part of request parameter.

//We need to exchange this code for the profile.

//The passport.authenticate('google') middleware call does it for us.
//On execution of this authenticate, before it executes the
//last function (req, resp, next) in our case, it will execute the callbck fn
//defined in the google stragtegy defn, in root/config/passport-setup.js

router.get('/google/redirect', passport.authenticate('google'), (req, resp) => {
//router.get('/google/redirect',  (req, resp) => {
  console.log('googleredirect invoked');
  resp.send('reached callback uri');
});

module.exports = router;
