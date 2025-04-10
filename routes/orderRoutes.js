const express = require("express");
const app = express();
const authonticationController = require("../middleware/auth");
const productsController = require("../controller/orderController");


app.post(
  "/addToWishlist",
  // authonticationController.validateToken,
  productsController.addToWishlist
);

app.post(
  "/addToCart",
  // authonticationController.validateToken,
  productsController.addToCart
);

app.post(
  "/order/create",
  // authonticationController.validateToken,
  productsController.createOrder
);

app.post(
  "/order/getAllOrders",
  // authonticationController.validateToken,
  productsController.getAllOrders
);

app.post(
  "/order/user/all",
  // authonticationController.validateToken,
  productsController.getUserOrders
);

app.post(
  "/order/updateStatus",
  // authonticationController.validateToken,
  productsController.updateOrderStatus
);

app.post(
  "/order/user/cancel",
  // authonticationController.validateToken,
  productsController.cancelOrderByUser
);

app.post(
  "/order/admin/cancel",
  // authonticationController.validateToken,
  productsController.cancelOrderByAdmin
);



module.exports = app;