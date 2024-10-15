require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;


const db_connection = async () => {
    mongoose.connect(DB_URL)
        .then(() => {
            console.log("Database connected!!")
        })
        .catch((err) => {
            console.log("Database connection error" + err)
        })
}


module.exports = db_connection;