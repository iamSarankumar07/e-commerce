const express = require("express");
const app = express();
const authonticationController = require("../middleware/auth");
const loginController = require("../controller/loginController");

app.post(
    "/user/signup",
    loginController.userSignup
);

app.post(
    "/user/userVerifySignUpOtp",
    loginController.userVerifySignUpOtp
);

app.post(
    "/user/signin",
    loginController.userSignin
);

app.post(
    "/user/userSigninVerifyOtp",
    loginController.userSigninVerifyOtp
);