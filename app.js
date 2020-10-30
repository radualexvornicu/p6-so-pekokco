const express = require('express');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const path = require('path');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
const helmet = require("helmet");
const hpp = require('hpp');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const cookieSession = require('cookie-session');
const ESAPI = require('node-esapi');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

<<<<<<< HEAD
=======
const cookieSession = require('cookie-session')
>>>>>>> 77d3546... cookie-session
const app = express();
=======
>>>>>>> 7d7fc0b... token fix, phh reinstalled and mongoose deprecationWarinng fix
=======
const app = express();
<<<<<<< HEAD
>>>>>>> bcb07f1... expres-mongo-sanitire

require('dotenv').config();
mongoose.connect( "mongodb+srv://" + process.env.DB_USER_TEST  + ":" +
 process.env.DB_USER_TEST_ACCESS + "@" + process.env.DB_CONNECT_CLUSTER + 
 "/test?retryWrites=true&w=majority",
  { useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
>>>>>>> 8a97e20... helmet and hpp

app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: process.env.COOKIE_SESSION,
  keys: [process.env.STRING_KEY1 , process.env.STRING_KEY2 ],

  // Cookie Options
  maxAge: 1 * 60 * 60 * 1000 // 1 hours
}));

mongoose.connect('mongodb+srv://user_goFull:44c5DqQ2PhJgTBpD@cluster0.8q125.gcp.mongodb.net/test?retryWrites=true&w=majority',
=======
mongoose.connect('mongodb+srv://user_goFull:' + string + '@cluster0.8q125.gcp.mongodb.net/test?retryWrites=true&w=majority',
>>>>>>> fc5237e... trying out to hide string
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
=======
const ESAPI = require('node-esapi');
>>>>>>> 20efc5b... cookie parser removed, ESAPI installed

=======
=======
const helmet = require("helmet");
const hpp = require('hpp');

>>>>>>> 8a97e20... helmet and hpp
require('dotenv').config();
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');


app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: process.env.COOKIE_SESSION,
  keys: [process.env.STRING_KEY1 , process.env.STRING_KEY2 ],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

>>>>>>> 96e5a97... db_connect .env
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
<<<<<<< HEAD
<<<<<<< HEAD
app.use(ESAPI.middleware());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(mongoSanitize());
=======
>>>>>>> 8a97e20... helmet and hpp
=======

=======
app.use(ESAPI.middleware());
>>>>>>> 20efc5b... cookie parser removed, ESAPI installed
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(mongoSanitize());
>>>>>>> bcb07f1... expres-mongo-sanitire
app.use(helmet());
app.use(hpp());
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;