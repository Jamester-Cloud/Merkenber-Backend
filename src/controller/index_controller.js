const {getSocket} = require('../sockets');
const {sendMessage} =  require('../twilio/send-sms');
const SMS = require('../models/sms');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
//Index route view renderer
const indexController =  async (req,res)=>{
	const messages = await SMS.find().sort('-createAt').lean();
	res.render('index',{messages});
}
//SMS funcion
const postMessage= async (req,res)=>{
	const {message, phone} = req.body;
	if(!message || !phone) return res.json('Missing phone or message. Please fill all fields');
	//Sending the message
	const twilioResult = await sendMessage(req.body.message, req.body.phone);

	await SMS.create({
		Body:req.body.message,
		To:req.body.phone
	})

	res.redirect('/');
}
//recieve a SMS
const recieveMesagge= async (req,res)=>{

	  console.log(req.body.Body);

	  const twiml = new MessagingResponse();

	  //twiml.message('This is my response');
	  
	  const SaveSMS = await SMS.create({
		Body:req.body.Body,
		From:req.body.From
	  })

	  getSocket().emit('IncomingMessage', SaveSMS);

	  res.send(twiml.toString());	 
}
//Exporting
module.exports={
	indexController,
	postMessage,
	recieveMesagge
}