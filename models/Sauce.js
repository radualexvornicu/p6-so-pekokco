const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  name: { type: String, require: true },
  userId: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number, require: false },
  dislikes: { type: Number, require: false },
  usersLiked: { type: [String], require: false },
  usersDisliked: { type: [String], require: false },
});

module.exports = mongoose.model("Sauce", sauceSchema);