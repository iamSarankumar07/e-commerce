const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser')

router.use(cookieParser());

// router.use(require("./loginRoutes"));
// router.use(require("./eCommerceRoutes"));


module.exports = router;