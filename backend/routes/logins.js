const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const Login = require("../models/Login");

router.route("/add").post(async (req, res) => {
  try {
    const user = await Login.findOne({
      username: req.body.username,
    });

    if (!user) {
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
    } else {
      res.json({ status: "user", messsage: "User Exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

//login route
router.post("/login", async (req, res) => {
  Login.findOne(
    {
      username: req.body.username,
    },
    async function (err, result) {
      if (!result) {
        // Resolve your query here
        return res.json({ status: "no_user", user: false });
      } else {
        console.log(result);

        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          result.password
        );

        if (isPasswordValid) {
          const token = jwt.sign(
            {
              username: result.username,
              role: result.role,
            },
            "secret123"
          );
          return res.json({
            status: "ok",
            user: token,
            role: result.role,
            username: result.username,
            id: result._id,
          });
        } else {
          return res.json({ status: "invalid_password", user: false });
        }
      }
    }
  );
});

module.exports = router;
