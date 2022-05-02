const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const Login = require("../models/Login");

router.route("/add").post(async (req, res) => {
  try {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role;

    const newLogin = new Login({
      username,
      password,
      role,
    });

    newLogin.save().then(() => {
      res.json({ status: "ok", messsage: "Login added" });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
