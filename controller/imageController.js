const Image = require("../models/imageModel");

exports.uploadImage = async (req, res) => {
  try {
    const data = new Image({
      title: req.body.title,
      description: req.body.description,
    });
    if (req.file) {
      data.image = req.file.path;
    }
    const savedData = await data.save();
    console.log(savedData);
    res.redirect("/ssm/mca/dashboard");
  } catch (err) {
    console.log(err);
  }
};

module.exports = exports;