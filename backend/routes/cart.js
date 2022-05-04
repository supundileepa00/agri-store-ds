const router = require("express").Router();
const Cart = require("../models/Cart");

//add item to cart
router.route("/add").post(async (req, res) => {
  try {
    const userID = req.body.userID;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;

    //create instance
    const newCart = new Cart({
      userID,
      name,
      description,
      price,
    });

    //save
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    console.log(error);
  }
});

//get all carts
router.route("/").get((req, res) => {
  Cart.find()
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete an user's cart
router.route("/delete/:id").delete(async (req, res) => {
  try {
    let cartID = req.params.id;

    let cart = await Cart.findById(req.params.id);
    console.log(cart);

    await cart.remove();
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

//get an user's cart
router.route("/:id").get(async (req, res) => {
  try {
    let userID = req.params.id;

    let cart = await Cart.find({ userID: userID });
    console.log(cart);

    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;