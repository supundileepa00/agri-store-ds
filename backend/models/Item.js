const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  cloudinaryID: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
