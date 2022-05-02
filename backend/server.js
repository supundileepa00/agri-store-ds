const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Connection Success!!");
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});

//routes

const itemRouter = require("./routes/item");
app.use("/agri/items", itemRouter);

const loginRouter = require("./routes/logins");
app.use("/agri/logins", loginRouter);
