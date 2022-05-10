const router = require("express").Router();
const Item = require("../models/Item");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//additem to store
router.route("/add").post(upload.single("image"), async (req, res) => {
  try {
    await cloudinary.image;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "agri-system-files/",
    });

    const userID = req.body.userID;
    const name = req.body.name;
    const description = req.body.description;
    const postedDate = Date();
    const price = req.body.price;
    const image = result.secure_url;
    const cloudinaryID = result.public_id;

    //create instance
    const newItem = new Item({
      userID,
      name,
      description,
      postedDate,
      image,
      price,
      cloudinaryID,
    });

    //save
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.log(error);
  }
});

//get all items
router.route("/").get((req, res) => {
  Item.find()
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete an item
router.route("/delete/:id").delete(async (req, res) => {
  try {
    let itemID = req.params.id;

    let item = await Item.findById(req.params.id);
    console.log(item);

    const val = await cloudinary.uploader.destroy(item.cloudinaryID, {
      folder: "agri-system-files/",
    });

    console.log(val);

    await Item.findByIdAndDelete(itemID);
    res.status(200).send({ status: "Item Deleted!!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while deleting the record!!" });
  }
});

//get one item
router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const item = await Item.findById(id)
    .then((item) => {
      res.status(200).send({ status: "Item Details", item });
    })
    .catch((err) => {
      console.log(err.messege);
      res
        .status(500)
        .send({ status: "Error while getting Item", error: err.messege });
    });
});

//get items of a user

router.route("/getUserItems/:id").get(async (req, res) => {
  let id = req.params.id;

  const item = await Item.find({ userID: id })

    .then((items) => {
      res.status(200).send({ status: "This User Items Details", items });
    })
    .catch((err) => {
      console.log(err.messege);
      res
        .status(500)
        .send({ status: "Error while getting Item", error: err.messege });
    });
});

//update item
router.route("/update/:id").put(upload.single("image"), async (req, res) => {
  try {
    let oldItem = await Item.findById(req.params.id);

    await cloudinary.uploader.destroy(oldItem.cloudinaryID, {
      folder: "agri-system-files/",
    });
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "agri-system-files/",
    });
    let itemID = req.params.id;

    const id = req.body.id;
    const userID = req.body.userID;
    const name = req.body.name;
    const description = req.body.description;
    const postedDate = Date();
    const price = req.body.price;
    const image = result.secure_url;
    const cloudinaryID = result.public_id;

    const updateItem = {
      id,
      name,
      description,
      postedDate,
      image,
      price,
      cloudinaryID,
    };
    const update = await Item.findByIdAndUpdate(itemID, updateItem);
    res.status(200).send({ status: "Item Details Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error while updating Data" });
  }
});

module.exports = router;
