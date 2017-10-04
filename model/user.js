var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var friendSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

var userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  friend: [friendSchema]	
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
