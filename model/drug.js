var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    enum: ['mg', 'g', 'IU', 'ml', 'nos']
  },
  shape: {
    type: String,
    enum: ['round', 'oval', 'square']
  },
  colour: {
    type: String,
    enum:['White', 'Black', 'Orange', 'Blue', 'Red'],
    default: 'White'
  },
  schedule: [{
    status: String,
    duration: Number,
    durationUnit: {type: String, enum: ['Days','Week', 'Month']},
    frequency: {everyNdays: Number, dayOfWeek:[Number]},
    dosage: {timesDaily: Number, timesDailySeconds:[Number], everyNHour: Number}
  }]
}, {
  timestamps: true
});


module.exports = mongoose.model('Drug', drugSchema);
