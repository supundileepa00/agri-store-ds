const router = require("express").Router();

//delivery service
//user sends data and gives response
router.route("/").post((req, res) => {
  const name = req.body.name;
  const mobileNumber = req.body.mobileNumber;
  const address = req.body.address;

  if (address) {
    res.status(200).json({
      delivery: "success",
      address: address,
      name: name,
      mobile: mobileNumber,
    });
    console.log("delivery successful");
  } else {
    res.status(404).json({
      delivery: "error",
    });
  }
});

module.exports = router;
