const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
});
