const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const PORT = process.env.PORT || 4000;
dotenv.config({path : "./config/config.env"})

app.use(bodyParser.json());
app.use(cors());
db.connectToDatabase();
app.use('/api', require('./routes/index.js'));
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error Occur While Starting The Server`);
    }
    console.log(`Server is listening at ${PORT}`);
})