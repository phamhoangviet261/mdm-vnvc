require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-shirobooking.wq7xs.mongodb.net/shirobooking?retryWrites=true&w=majority`)

        console.log("MongoDB connected...");
    } catch (error) {
        console.log("ERROR when connect to MongoDB.", error);
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors()) 
app.use(cookieParser());

const authLogin = require('./middlewares/auth').checkLogin
const authRoute =  require('./routes/auth')
app.use('/auth', authLogin, authRoute)
app.get((req, res) => {
    return res.json("cccccccccccccccccccccccccccc")
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})