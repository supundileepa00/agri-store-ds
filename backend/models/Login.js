const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
