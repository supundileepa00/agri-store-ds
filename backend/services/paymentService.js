const router = require("express").Router();

//payment service
router.route("/pay").post((req, res) => {
  const cardNumber = req.body.cardNumber;
  const amount = req.body.amount;
  const cvc = req.body.cvc;

  res
    .status(202)
    .json({ paymentStatus: "success : email & sms sent", amount: amount });

  console.log("Payment Success");
});

module.exports = router;
