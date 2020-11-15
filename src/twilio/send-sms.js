
const config = require('../config');

const client =require('twilio')(config.accountSSID, config.AUTH_TOKEN);

// twilio send message function
async function sendMessage(body, phone){
	console.log('mensaje enviado');
	try {
		const message = await client.messages.create({
			to:phone,
			from:'+13157074083',
			body:body		
		})
		return message;
	} catch(err) {
		console.log(err);
	}
}
//End of function

module.exports = {sendMessage};

