const videoModel = require("../models/video");
const imageModel = require("../models/image");
const productModel = require("../models/product");
const orderModel = require("../models/order");
const userModel = require("../models/user");
const pinCodeModel = require("../models/pinCode")

exports.uploadVideo = async (req, res) => {
    try {
        
    } catch (err) {
        console.log("Error in uploadVideo: " + err);
        return res.json({
            success: false,
            message: "Internal Server Error!. Please try again later.",
            data: []
        });
    }
};

exports.getVideos = async (req, res) => {
    let reqBody = req.body;
    try {
        let matchObj = {
            isDelete: false, 
            isActive: true,
        };

        if (reqBody.filter === "all") {

        } else {
            matchObj.filter = reqBody.filter;
        }

        let videoData = await videoModel.find(matchObj).lean();
        return res.json({
            success: true,
            data: videoData
        });
    } catch (err) {
        console.log("Error in getVideos: " + err);
        return res.json({
            success: false,
            message: "Internal Server Error!. Please try again later.",
            data: []
        });
    }
};

exports.addProduct = async (req, res) => {
    try {
        
    } catch (err) {
        console.log("Error in addProduct: " + err);
        return res.json({
            success: false,
            message: "Internal Server Error!. Please try again later.",
            data: []
        });
    }
};

exports.productEditOrDelete = async (req, res) => {
    try {
        
    } catch (err) {
        console.log("Error in productEditOrDelete: " + err);
        return res.json({
            success: false,
            message: "Internal Server Error!. Please try again later.",
            data: []
        });
    }
};

exports.productData = async (req, res) => {
    try {
        
    } catch (err) {
        console.log("Error in productData: " + err);
        return res.json({
            success: false,
            message: "Internal Server Error!. Please try again later.",
            data: []
        });
    }
};

exports.pinCodeCheck = async (req, res) => {
    let reqBody = req.body;

    try {
        let pinCodeExists = await pinCodeModel.find({ pinCodes: { $in: reqBody.pinCode } });

        if (pinCodeExists.length > 0) {
            return res.json({
                success: true,
                message: "Delivery service is available in your area."
            });
        } else {
            return res.json({
                success: false,
                message: `Sorry, delivery service is not available for the provided pin code: ${reqBody.pinCode}. Please try another location.`
            });
        }
        
    } catch (err) {
        console.log("Error in productData: " + err);
        return res.json({
            success: false,
            message: "Internal Server Error!. Please try again later.",
        });
    }
};

module.exports = exports;