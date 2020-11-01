scrambelString = () => {
  return("44c5DqQ2PhJgTBpD")
};
const string = scrambelString();
const express = require('express');
const secure = require('express-force-https');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const path = require('path');
<<<<<<< HEAD
=======
const helmet = require("helmet");
const hpp = require('hpp');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const cookieSession = require('cookie-session');
const ESAPI = require('node-esapi');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();
app.use(secure);
require('dotenv').config();
mongoose.connect( "mongodb+srv://" + process.env.DB_DELETE_UPDATE  + ":" +
 process.env.DB_DELETE_UPDATE_ACCESS + "@" + process.env.DB_CONNECT_CLUSTER + 
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
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(ESAPI.middleware());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;