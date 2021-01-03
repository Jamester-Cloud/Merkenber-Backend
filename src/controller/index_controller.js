const {sendMessage} =  require('../twilio/send-sms');
const SMS = require('../models/sms');
//Importar servicios de base de datos
const pool = require('../database');
//
const MessagingResponse = require('twilio').twiml.MessagingResponse;
//Index route view renderer
const indexController =  async (req,res)=>{
	// indexando mensajes
}
//SMS funcion
const postMessage= async (req,res)=>{
	
	const {message, phone} = req.body;

	if(!message || !phone) return res.json('Missing phone or message. Please fill all fields');
	//Sending the message
	const twilioResult = await sendMessage(req.body.message, req.body.phone);

	
	// Aca se envia la respuesta al front
	res.redirect('/');
}
//recieve a SMS
const recieveMesagge= async (req,res)=>{

	  console.log(req.body.Body);

	  const twiml = new MessagingResponse();

	  //twiml.message('This is my response');
	  // Guardando mensajes
	  const SaveSMS = await SMS.create({
		Body:req.body.Body,
		From:req.body.From
	  })
	// Aca se envia la respuesta al front
	  getSocket().emit('IncomingMessage', SaveSMS);

	  res.send(twiml.toString());	 
}
//Exporting
module.exports={
	indexController,
	postMessage,
	recieveMesagge
}