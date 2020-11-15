const {Schema, model}= require('mongoose');

const newSchema = new Schema({
	Body:{
		type:String,
		required:true,
	},
	To:{
		type:String
	},
	From:{
		type:String
	}
},{timestamps:true});


module.exports= model('SMS', newSchema);
