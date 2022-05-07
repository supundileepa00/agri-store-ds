const router = require("express").Router();

router.route("/pay").post((req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const pin = req.body.pin;
  const amount = req.body.amount;

  if (String(pin).length == 6) {
    res.status(202).json({
      paymentStatus: "success",
      amount: amount,
      MobileNumber: mobileNumber,
    });
  } else {
    res.status(202).json({
      paymentStatus: "unsuccesfull",
      amount: amount,
      message: "Pin is Not valid",
    });
  }
});

module.exports = router;
