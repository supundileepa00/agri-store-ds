const router = require("express").Router();

//payment service mobile
router.route("/pay").post((req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const pin = req.body.pin;
  const amount = req.body.amount;

  if (String(pin).length == 6) {
    res.status(202).json({
      paymentStatus: "success : email & sms sent",
      amount: amount,
      MobileNumber: mobileNumber,
    });
    console.log("Payment successful");
  } else {
    res.status(202).json({
      paymentStatus: "unsuccesfull",
      amount: amount,
      message: "Pin is Not valid",
    });
  }
});

module.exports = router;
