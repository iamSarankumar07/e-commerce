const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const authFile = require("../middleware/auth");
const helper = require("../helper");
const emailTemplateModel = require("../models/emailTemplate");

exports.userSignup = async (req, res) => {
  let reqBody = req.body;
  let name = reqBody?.name;
  let email = reqBody?.email;
  let phone = reqBody?.phone;

  try {
    let [existingEmail, existingPhone] = await Promise.all([
      userModel.findOne({ email: email }),
      userModel.findOne({ phone: phone }),
    ]);
    
    if (existingEmail) {
      return res.json({
        success: false,
        message: "Email already exists!"
      });
    }

    if (existingPhone) {
      return res.json({
        success: false,
        message: "Phone number already exists!"
      });
    };

    let OTP = Math.floor(100000 + Math.random() * 900000);

    let user = new userModel({
      name: name,
      email: email,
      phone: phone,
      isActive: false,
      otp: OTP.toString(),
    });

    let savedData = await user.save();

    res.json({
      success: true,
      data: savedData,
    });

    let userOTPTemplate = await emailTemplateModel.findOne({ name: "USER_SIGNUP_OTP" });
    let content = eval("`" + userOTPTemplate.content + "`");
    let subject = "Verification OTP";

    helper.sendEmail(email, subject, content)

  } catch (err) {
    console.log("Error in userSignup: " + err);
    res.json({
      success: false,
      message: "Internal Server Error!. PLease try again later"
    });
  }
};

exports.userVerifySignUpOtp = async (req, res) => {
  let reqBody = req.body;
  let userId = reqBody.userId;
  let otp = reqBody.otp;
  try {
    let userData = await userModel.findById(userId);

    if (userData?.otp !== otp) {
      return res.json({
        success: false,
        message: "Please enter correct OTP!"
      });
    }

    if (userData?.otp === otp) {

      userData.isActive = true;
      userData.save();
      let userSignupSuccessTemplate = await emailTemplateModel.findOne({ name: "USER_SIGNUP_SUCCESS" });
      let content = eval("`" + userSignupSuccessTemplate.content + "`");
      let subject = "Registration Successfully!";

      helper.sendEmail(userData?.email, subject, content);

      return res.json({
        success: true,
        data: userData
      });
    }

  } catch (err) {
    console.log("Error in userVerifyOtp: " + err);
    res.json({
      success: false,
      message: "Internal Server Error!. PLease try again later"
    });
  }
};

exports.userSignin = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found!. Please check your email"
      });
    }

    let OTP = Math.floor(100000 + Math.random() * 900000);

    user.otp = OTP.toString(); 
    let userData = await user.save();

    let userOTPTemplate = await emailTemplateModel.findOne({ name: "USER_SIGNIN_OTP" });
    let content = eval("`" + userOTPTemplate.content + "`");
    let subject = "Verification OTP";

    helper.sendEmail(user?.email, subject, content);

    res.json({
      success: true,
      data: userData
    });

  } catch (err) {
    console.log("Error in user:", err);
    res.json({
      success: false,
      message: "Internal Server Error!. Please try again later."
    });
  }
};

exports.userSigninVerifyOtp = async (req, res) => {
  let reqBody = req.body;
  let userId = reqBody.userId;
  let otp = reqBody.otp;
  try {
    let userData = await userModel.findById(userId);

    if (userData?.otp !== otp) {
      return res.json({
        success: false,
        message: "Please enter correct OTP!"
      });
    }

    if (userData?.otp === otp) {

      userData.otp = null;
      userData.save();

      return res.json({
        success: true,
        data: userData
      });
    };

  } catch (err) {
    console.log("Error in userVerifyOtp: " + err);
    res.json({
      success: false,
      message: "Internal Server Error!. PLease try again later"
    });
  }
};

module.exports = exports;
