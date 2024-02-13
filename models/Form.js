const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    roleOffered: {
        type: String,
        required: true,
    },
    ctc: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Form = mongoose.model("Form", formDataSchema);

module.exports = Form;
