const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  name: { type: String, require: true },
  userId: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
<<<<<<< HEAD
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked:  [{ type: String, default: [] }],
  usersDisliked: [{ type: String, default: [] }],
=======
  likes: { type: Number, require: false },
  dislikes: { type: Number, require: false },
  usersLiked: { type: [String], require: false },
  usersDisliked: { type: [String], require: false },
>>>>>>> 656e57a... like and dislike somehow working, like 0 nono
});

module.exports = mongoose.model("Sauce", sauceSchema);