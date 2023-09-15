const express = require("express");
const router = express.Router();
const path = require("path");
const upload = require("../src/middleware/upload.middleware");
const Resize = require("../src/controllers/resize.controller");

router.post("/image", upload.single("file"), async function (req, res) {
  const imagePath = path.join(__dirname, "../upload_images");

  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.send({
      error: {
        status: 401,
        message: "Please provide an image",
      },
    });
    res.status(401).json({ error: "" });
  }
  const filename = await fileUpload.save(req.file.buffer);

  return res.send({
    status: 200,
    message: filename,
  });
});

module.exports = router;
