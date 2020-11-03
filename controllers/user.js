const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoSanitize = require('express-mongo-sanitize');
const validator = require('validator'); 
const passwordValidator = require('password-validator');
const User = require('../models/User');
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(25)                                  // Maximum length 16
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);


exports.signup = (req, res, next) =>{
  const email = mongoSanitize.sanitize(req.body.email);
  const password = mongoSanitize.sanitize(req.body.password);  
    if(schema.validate(password)){
      res.status(200).json({ message: "Mot de pass est ok ! "});
    } else{
      res.status(401).json({ message: "Mot de pass n'a pas le format correct ! " });
    };
   
    if(validator.isEmail(email)){
      bcrypt.hash(password, 10)
      .then(hash => {
          const user = new User({
              email: Buffer.from(email).toString('base64'),
              password: hash
          });
          user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur cree !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    }else {
      res.status(401).json({ error: "Email format invalid !" });
  };    
};

exports.login = (req, res, next) => {
  const email = mongoSanitize.sanitize(req.body.email);
  const password = mongoSanitize.sanitize(req.body.password);
        User.findOne({ email: Buffer.from(email).toString('base64') })
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