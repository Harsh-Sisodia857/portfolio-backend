const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    resume: {
        type: Buffer
    }
});

const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;