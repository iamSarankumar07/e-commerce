const mongoose = require("mongoose");

const EmailTemplateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

const Templates = mongoose.model('Templates', EmailTemplateSchema);

module.exports = Templates;
