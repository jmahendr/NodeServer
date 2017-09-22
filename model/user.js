var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var scheduleSchema = new Schema({

});

var drugSchema = new Schema({
	name:{},
	type:{},
	strength:{},
	unit:{},
	shape:{},
	colour:{},
	schedule:[{status:String,
			   duration:String,
			   frequency:{}
			  }]
},{
	timestamps: true
});



var userSchema = new Schema({
	fisrtname:{},
	lastname:{},
	email:{},
	friend:{},
	drug:[drugSchema]
},{
	timestamps:true
});

module.exports = mongoose.model('User',userSchema);
