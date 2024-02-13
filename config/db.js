const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({path : "./config/config.env"})

const port = process.env.PORT || 3000;
console.log()
const connectToDatabase = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URI, {
        useUnifiedTopology : true
    }).then( (data) => {
        console.log(`MongoDb connected with Server : ${port}`);
    })
}

module.exports = { connectToDatabase };