const Sauce = require('../models/Sauce');
const fs = require('fs');
const { log } = require('console');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    sauce
      .save()
      .then(() =>
        res.status(201).json({ message: "Nouvelle Sauce Enregistrée !" })
      )
      .catch((error) => res.status(400).json({ error }));
  };

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: '${req.protocol}://${req.get("host")}/images/${req.file.filename}',
    }
    : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id},
        { ...sauceObject, _id: req.params.id }
    )
    .then(() => res.status(200).json({ message: "Sauce modifie !" }))
    .catch((error) => res.status(400).JSON({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then((sauce) =>{
            const filename = sauce.imageUrl.split("/images")[1];
            fs.unlink('images/${filename}', () =>{
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Sauce bien supprime ! "}))
                    .catch((error) => res.status(400).json({ error}));
            });
        });
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => res.status(400).json({ error}));
};


exports.likeSauce = (req, res, next) => {
    console.log(req.body.userId);
    console.log(req.body.like);
    switch (req.body.like) {
        case 1 : {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } })
            .then(() => res.status(200).json({ message: "Sauce aimee !" }))
            .catch((error) => res.status(400).json({ error}));
            Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: "Sauce aimee by user !" } ))
            .catch((error) => res.status(400).json({ error }));
        };
        break;
    case -1 :{
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 } })
        .then(() => res.status(200).json({ message: "Sauce non aimee !" }))
        .catch((error) => res.status(400).json({ error}));
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: req.body.userId } })
        .then(() => res.status(200).json({ message: "Sauce non aimee by user !" } ))
        .catch((error) => res.status(400).json({ error }));
    };
    break;
    case 0 : {  
        console.log(" like/dislike modifie ! ");      
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: "Like retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } }
          )
            .then(() => res.status(200).json({ message: "Dislike retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
    };
    break;
    };
};
    