//configuracion de servidor
const express = require('express');
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const passport  = require('passport');
const morgan = require('morgan');
const mysqlStore = require('express-mysql-session');
const session = require('express-session');
const {database} = require('./keys');
//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layaouts'),
    extname:'.hbs',
    helpers: require('./libs/handlebars')
}));

app.use(passport.initialize()); // iniciando passport
app.use(passport.session()); // dandole a passport una sessionnpmnpmnpm
//Static files (remove in REST API development)
app.use(express.static(path.join(__dirname, 'public')));
app.use
app.set('view engine', '.hbs'); // estableciendo las extensiones de las vistas a hbs (Handlebars)

app.use(session({
    secret:'Jamester',
    resave:false,
    saveUninitialized:false,
    store: new mysqlStore(database)
 }));

app.set('view engine', '.hbs');
//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use(require('./routes/index'));
//statis files

module.exports = app;