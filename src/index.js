//Enviroment variables
require('dotenv').config();
// app server
const app = require('./server');
//Http module
const http = require('http');
//DB connection
const db = require('./database');
//server connection
const server = http.createServer(app);

require('./sockets').connection(server);



server.listen(app.get('port'),()=>{
	console.log("Listen server on port", app.get('port'));
});



