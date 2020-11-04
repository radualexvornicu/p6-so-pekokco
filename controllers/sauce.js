const Sauce = require('../models/Sauce');
const fs = require('fs');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// Route Post permet de créer une sauce 
exports.createSauce = (req, res, next) =>
{   console.log(JSON.parse(req.body.sauce));
    console.log(req.file.filename);
  //stock les données envoyées par le front-end sous forme de form-data dans une variable en les transformant en objet js
  const sauceObject = JSON.parse(req.body.sauce);
  //supprime l'id envoyé par le front-end
  delete req.body._id;
  //création d'une instance du modèle Sauce
  const sauce = new Sauce(
    {
=======
const { log } = require('console');
=======
>>>>>>> 7d7fc0b... token fix, phh reinstalled and mongoose deprecationWarinng fix

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
>>>>>>> 74f5245... like 1 -1 0 kinda working
=======
// Route Post permet de créer une sauce 
exports.createSauce = (req, res, next) =>
{
  //stock les données envoyées par le front-end sous forme de form-data dans une variable en les transformant en objet js
  const sauceObject = JSON.parse(req.body.sauce);
  //supprime l'id envoyé par le front-end
  delete sauceObject._id;
  //création d'une instance du modèle Sauce
  const sauce = new Sauce(
    {
>>>>>>> ab9b633... last check some comments
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
    });
    //sauvegarde de la sauce dans la base de données
    sauce.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({error}));
};
<<<<<<< HEAD

// Route Put
exports.modifySauce = (req, res, next) =>{
    console.log(req.file);
    if(req.file){
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => fs.unlink(`images/${sauce.imageUrl.split('/images/')[1]}`, () =>{}))
        .catch(err => res.status(500).json({ err }));
    }
    console.log(req.file);
=======
// Route Put
exports.modifySauce = (req, res, next) =>{
    console.log((req.body));
>>>>>>> ab9b633... last check some comments
    const sauceObject = req.file ? 
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body } 
<<<<<<< HEAD
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })  
    .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({error}));
};

=======
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({error}));
};
>>>>>>> ab9b633... last check some comments
// Route Delete permet de supprimer la sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then((sauce) =>{
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ab9b633... last check some comments
            //supprime l'image
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () =>{
                //supprime le document correspondant de la base de données
<<<<<<< HEAD
=======
            
            fs.unlink('images/${sauce.imageUrl.split("/images/")[1]}', () =>{
>>>>>>> b113a18... trying out password validator and email validator
=======
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () =>{
>>>>>>> bf66b8b... unlink sauce ok
=======
>>>>>>> ab9b633... last check some comments
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Sauce bien supprime ! "}))
                    .catch((error) => res.status(400).json({ error}));
            });
        });
};
// Route Get permet de récupérer la sauce préciser grâce à son id depuis la base de données
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => res.status(404).json({ error }));
};
// Route Get permet de récuperer toutes les sauces de la base de données
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => res.status(400).json({ error}));
};
// Route Post permet de liker/dislaker la sauce 
<<<<<<< HEAD
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId; 
    const like = req.body.like;
    Sauce.findOne({ _id: req.params.id })
    .then( sauce => {

<<<<<<< HEAD
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
    
=======

=======
>>>>>>> ab9b633... last check some comments
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId; 
<<<<<<< HEAD
    console.log(req.body.like);
<<<<<<< HEAD
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
<<<<<<< HEAD
    if (req.body.like === 0) {
        Sauce.findOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: "Sauce something ! "}))
        .catch((error) => res.status(400).json({ error }));
    }
};
>>>>>>> 656e57a... like and dislike somehow working, like 0 nono
=======
    break;
    case 0 : {  
        console.log(" like/dislike modifie ! ");      
=======
=======
>>>>>>> 7d7fc0b... token fix, phh reinstalled and mongoose deprecationWarinng fix
    const like = req.body.like;
>>>>>>> fd6ba49... fix for missed promisse, first find _id
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
    
>>>>>>> 74f5245... like 1 -1 0 kinda working
