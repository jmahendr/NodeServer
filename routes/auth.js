var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  //nothing special here as we do not plan to have local users. Only federated users (login with service)
  console.log('Login invoked');
  res.send("success with login");
});

router.get('/logout', function(req, res, next) {
  //handle with passport
  console.log('Logout invoked.');
});

router.get('/google', function(req, res, next) {
  console.log('google handler invoked');
  res.send("logging in with Google");
});

router.get('/googleredirect', function(req, resp, next) {
  console.log('googleredirect invoked');
});

module.exports = router;
