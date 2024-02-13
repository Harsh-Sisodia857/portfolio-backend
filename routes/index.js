const express = require("express");
const router = express.Router();
const Form = require("../models/Form")
const multer = require('multer');
const Resume = require("../models/Resume")
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
const User = require("../models/User")

router.post('/formData', async (req, res) => {
    try {
        const formData = await Form.create(req.body);
        
        res.status(201).json({
            message: "Form data submitted successfully!",
            success : true,
            formData
        });
    } catch (error) {
        console.error("Error submitting form data:", error);
        res.status(500).json({
            error: "Internal Server Error",
            success : false
        });
    }
});

router.post('/updateResume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // checking credentials
        const { username, token } = req.body;
        const user = User.find({ username });
        if (user) {
            // now checking token
            if (user.token != token) {
                return res.json({
                    success : false,
                    message: "Unable To Update The Resume",
                    error : "Token Not Matched"
                })
            }
        }
        else {
            return res.json({
                success: false,
                message: "Unable To Update The Resume",
                error: "User Not Found"
            })
        }
        // now find resume
        let resume = await Resume.findOne();

        if (!resume) {
            resume = new Resume();
        }

        resume.resume = req.file.buffer;

        await resume.save();

        res.status(200).json({ message: 'Resume uploaded successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getResume', async (req, res) => {
    try {
        const resume = await Resume.findOne();

        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=resume.pdf');

        res.send(resume.resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/myData', async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = await User.find({ username });

        if (users.length === 0) {
            return res.json({ error: "You Are Not Allowed to Update My Resume" });
        }

        const user = users[0];
        
        if (user.password !== password) {
            return res.json({ error: "Incorrect Password" });
        }
        console.log(user.password)
        return res.json({
            success: true,
            token: user.token,
            username : user.username,
            error: null,
            message: "Welcome Harsh!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;