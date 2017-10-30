#! /usr/bin/env node

console.log('This script populates a some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

var async = require('async');
var Drug = require('./model/drug');
var User = require('./model/user');
var keys = require('./config/keys');

var mongoose = require('mongoose');
mongoose.connect(keys.mongodb.dburi);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var friends = [];
var users = [];
var drugs = [];
var schedules = [
  {
    status: 'Active',
    duration:1,
    durationUnit:'Week',
    frequency:{everyNdays: 1},
    dosage:{timesDaily: 3, timesDailySeconds:[28800, 43200, 72000]}
  },
  {
    status: 'Active',
    duration:10,
    durationUnit:'Days',
    frequency:{everyNdays: 1},
    dosage:{timesDaily: 2, timesDailySeconds:[28800, 72000]}
  },
  {
    status: 'Active',
    duration:10,
    durationUnit:'Days',
    frequency:{dayOfWeek:[1,1,1,0,0,1,0]},
    dosage:{timesDaily: 2, timesDailySeconds:[28800, 72000]}
  },
  {
    status: 'Inactive',
    duration:10,
    durationUnit:'Days',
    frequency:{dayOfWeek:[1,1,1,0,0,1,0]},
    dosage:{timesDaily: 2, timesDailySeconds:[28800, 72000]}
  }];

function friendCreate(first_name, family_name, e_mail, cb) {
  friendDetail = {
    firstname: first_name,
    lastname: family_name,
    email: e_mail
  };

    console.log('New Friend: ' + JSON.stringify(friendDetail));
    friends.push(friendDetail);
    cb(null, friendDetail);
};//end of friendCreate

function userCreate(first_name, family_name, e_mail, l_friend, cb) {
  userDetail = {
    firstname: first_name,
    lastname: family_name,
    email: e_mail,
    friend : [l_friend]
  };

  var user = new User(userDetail);
  user.save(function(err) {
    if(err) {
      cb(err, null);
      return;
    }
    else {
      console.log('New User: ' + user);
      users.push(user);
      cb(null, user);
    }
  });
};//end of userCreate

function drugCreate(p_userId, p_name, p_type, p_strength, p_unit, p_shape, p_colour, p_schedule, cb){
  drugDetail = {
    user:p_userId,
    name:p_name,
    type:p_type,
    strength:p_strength,
    unit:p_unit,
    shape:p_shape,
    colour:p_colour,
    schedule:p_schedule
  };
  var drug = new Drug(drugDetail);
  drug.save(function(err){
    if(err) {
      cb(err, null);
    }
    else {
      console.log('New Drug' + drug);
      drugs.push(drug);
      cb(null, drug);
    }
  });

}//end of drugCreate


function createFriendUser(cb) {
  async.parallel([
      function(callback) {
        friendCreate('Joshua', 'Mahendran', 'Joshua.Mahendran@gmail.com', callback);
      },
      function(callback) {
        friendCreate('Mary', 'Arthy', 'mary.arthy@gmail.com', callback);
      },
      function(callback) {
        userCreate('Joshua','Mahendran','joshua.mahendran@gmail.com', friends[1], callback);
      },
      function(callback) {
        userCreate('Mary','Arthy','mary.arthy@gmail.com', friends[0], callback);
      },
      function(callback) {
        userCreate('Jason', 'Immanuel', 'jasonimmanueljoshua5@gmail.com', friends[0], callback);
      },
      function(callback) {
        userCreate('Joann', 'Natasha', 'joann.natasha@gmail.com', friends[1], callback);
      }
    ],
    // optional callback
    cb);
}//end of createFriendUser

function createUserDrug(cb) {
  async.parallel([
    function(callback) {
      drugCreate('59d4a184aa7eb9260cb87162', 'Becosules', 'Capsule', 500, 'mg', 'oval', 'Red', schedules[0], callback);
    },
    function(callback) {
      drugCreate('59d4a184aa7eb9260cb87162', 'Tendocare', 'Tablet', 1, 'nos', 'round', 'Black', schedules[1], callback);
    },
    function(callback) {
      drugCreate('59d4a184aa7eb9260cb87162', 'Rozagold', 'Capsule', 10, 'mg', 'oval', 'Orange', schedules[2], callback);
    }
  ], cb);
}

async.series([
    createFriendUser,
    createUserDrug
  ],
  // optional callback
  function(err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Data Created: ' + JSON.stringify(results));

    }
    //All done, disconnect from database
    mongoose.connection.close();
  });
