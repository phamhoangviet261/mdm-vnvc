require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodbcluster.akchj.mongodb.net/MDM-VNVC?retryWrites=true&w=majority`)

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

//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

// const connectNeo = require('./middlewares/neo4j').connectNeo4j

// connectNeo()  
app.use(cookieParser());

const authLogin = require('./middlewares/auth').checkAuth;
const authRoute =  require('./routes/auth');
app.use('/auth', authLogin, authRoute);
app.use('/vaccine', authLogin, require('./routes/vaccine'));
app.use('/package', authLogin, require('./routes/packageVaccine'));
app.use('/customer', authLogin, require('./routes/customer'));
app.use('/user', authLogin, require('./routes/user'));
app.use('/invoice', authLogin, require('./routes/invoice'));
app.use('/registervaccine', authLogin, require('./routes/registerVaccine'))
app.use('/expert', authLogin, require('./routes/expert'));
app.use('/center', authLogin, require('./routes/center'));
app.use('/neo4j', authLogin, require('./routes/neo4j'));
app.use('/question', authLogin, require('./routes/question'));
app.use('/answer', authLogin, require('./routes/answer'));

app.get('/', authLogin, (req, res) => {
    return res.status(400).json("404 ERROR")
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})