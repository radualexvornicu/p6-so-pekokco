const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const validator = require('email-validator'); 
const passwordValidator = require('password-validator');
const User = require('../models/User');
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(30)                                  // Maximum length 30
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);


exports.signup = (req, res, next) =>{
  const email = mongoSanitize.sanitize(req.body.email);
  const password = mongoSanitize.sanitize(req.body.password);  
  const buffer = Buffer.from(email);
  const emailMasked = buffer.toString('base64');
  console.log(validator.validate(email));
    if(validator.validate(email)){
      res.status(200).json({ message: "mail est ok ! "});
    } else{
      res.status(401).json({ message: "mail n'a pas le format correct ! " });
    };
 
    if(schema.validate(password)){
      bcrypt.hash(password, 10)
      .then(hash => {
          const user = new User({
              email: emailMasked,
              password: hash
          });
          user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur cree !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    }else {
      res.status(401).json({ error: "Password format invalid !" });
  };    
};

exports.login = (req, res, next) => {
  const email = mongoSanitize.sanitize(req.body.email);
  const password = mongoSanitize.sanitize(req.body.password);
  const buffer = Buffer.from(email);
  const emailMasked = buffer.toString('base64');
        User.findOne({ email: emailMasked })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };