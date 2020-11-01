const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
<<<<<<< HEAD
<<<<<<< HEAD
const mongoSanitize = require('express-mongo-sanitize');
const validator = require('email-validator'); 
const passwordValidator = require('password-validator');
=======

>>>>>>> 7d7fc0b... token fix, phh reinstalled and mongoose deprecationWarinng fix
=======
const mongoSanitize = require('express-mongo-sanitize');
const validator = require('validator'); 
const passwordValidator = require('password-validator');
>>>>>>> a4af259... pass validator, mask mail
const User = require('../models/User');
const schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
<<<<<<< HEAD
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
    } else{
    res.status(401).json({ message: "mail n'a pas le format correct ! " });
    };
 
       
=======
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);


exports.signup = (req, res, next) =>{
  const email = mongoSanitize.sanitize(req.body.email);
  const password = mongoSanitize.sanitize(req.body.password);
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
    res.status(401).json({ error: "Email format invalid !" })
};
    
>>>>>>> a4af259... pass validator, mask mail
};

exports.login = (req, res, next) => {
  const email = mongoSanitize.sanitize(req.body.email);
  const password = mongoSanitize.sanitize(req.body.password);
<<<<<<< HEAD
  const buffer = Buffer.from(email);
  const emailMasked = buffer.toString('base64');
        User.findOne({ email: emailMasked })
=======
        User.findOne({ email: Buffer.from(email).toString('base64') })
>>>>>>> a4af259... pass validator, mask mail
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
<<<<<<< HEAD
<<<<<<< HEAD
                process.env.TOKEN,
                { expiresIn: '24h' }
=======
                'RANDOM_TOKEN_SECRET',
=======
                process.env.TOKEN,
<<<<<<< HEAD
>>>>>>> 7d7fc0b... token fix, phh reinstalled and mongoose deprecationWarinng fix
                { expiresIn: '1h' }
>>>>>>> 74f5245... like 1 -1 0 kinda working
=======
                { expiresIn: '24h' }
>>>>>>> a4af259... pass validator, mask mail
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };