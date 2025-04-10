const express = require("express");
const app = express();
const authonticationController = require("../middleware/auth");
const eCommerceController = require("../controller/eCommerceController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post(
  "/uploadVideo",
  upload.single("image"),
//   authonticationController.validateToken,
  eCommerceController.uploadVideo
);

app.post(
  "/getVideos",
//   authonticationController.validateToken,
  eCommerceController.getVideos
);

app.post(
  "/product/add",
  upload.single("image"),
//   authonticationController.validateToken,
  eCommerceController.addProduct
);

app.post(
  "/product/editOrDelete",
  upload.single("image"),
//   authonticationController.validateToken,
  eCommerceController.productEditOrDelete
);

app.post(
  "/product/data",
//   authonticationController.validateToken,
  eCommerceController.productData
);

app.post(
  "/pinCodeCheck",
//   authonticationController.validateToken,
  eCommerceController.pinCodeCheck
);




module.exports = app;