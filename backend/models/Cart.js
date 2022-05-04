const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
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
    price : {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Cart", CartSchema);