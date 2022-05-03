const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "Login",
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
        type: String,
        required: true,
    },
    quantity : Number,
    total : {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Cart", CartSchema);