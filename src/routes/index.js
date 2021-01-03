const {Router} = require('express');
const router = Router();

const {indexController, postMessage, recieveMesagge} = require('../controller/index_controller');
//Main route
router.get('/', indexController);
// Send message method
router.post('/send-sms',postMessage);
//recieved a message
router.post('/newSMS', recieveMesagge);

module.exports=router;