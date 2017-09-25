var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var scheduleSchema = new Schema({

});

var drugSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Tablet', 'Capsule', 'Sachet', 'Injection', 'Syrup'],
    required: true
  },
  strength: {
    type: Number
  },
  unit: {
    type: String,
    enum: ['mg', 'g', 'IU', 'ml']
  },
  shape: {
    type: String,
    enum: ['round', 'oval', 'square']
  },
  colour: {
    type: String,
    default: 'White'
  },
  schedule: [{
    status: String,
    duration: String,
    frequency: {}
  }]
}, {
  timestamps: true
});


module.exports = mongoose.model('Drug', drugSchema);
