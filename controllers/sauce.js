const Sauce = require('../models/Sauce');
const fs = require('fs');

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
    const userId = req.body.userId; 
    const like = req.body.like;
    Sauce.findOne({ _id: req.params.id })
    .then( sauce => {

        switch (like) {
            case 1 : 
                Sauce.updateOne({ _id: req.params.id }, { $inc:{likes: +1}, $push:{usersLiked: userId}, _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: "Like !"});
                    })
                    .catch(error => res.status(400).json({ error }));
                break;
            case 0 : 
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc:{likes: -1}, $pull:{usersLiked: userId}, _id: req.params.id })
                        .then(() => {
                            res.status(200).json({ message: "Like pas possible !"});
                        })
                        .catch(error => res.status(400).json({ error }));
                } 
                else if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc:{dislikes: -1}, $pull:{usersDisliked: userId}, _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: "Dislike pas possible !"});
                    })
                    .catch(error => res.status(400).json({ error }));
                }     
                break;
            case -1 : 
                Sauce.updateOne({ _id: req.params.id }, { $inc:{dislikes: +1}, $push:{usersDisliked: userId}, _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: "Dislike !"});
                    })
                    .catch(error => res.status(400).json({ error }));
                break;
            default : 
                console.log("error");
        }
    })
    .catch(error => {
        res.status(404).json({ error })
    });  
};
    