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
  providerID: {
    type: String  
  },
  provider: {
      type: String,
      enum: ['Google', 'Github'],
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  friend: [friendSchema]	
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
