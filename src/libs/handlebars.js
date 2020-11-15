const timeago = require('timeago.js');
module.exports={
	hideNumber:(phoneNumber = '')=>{
		return phoneNumber.replace(/[0-9]/g, 'x');
	},
	timeAgo:(dateTimeStamp)=>{
		return timeago.format(dateTimeStamp);
	}
}