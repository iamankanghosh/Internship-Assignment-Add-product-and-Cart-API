const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const databaseLink = process.env.databaseLink;

mongoose.connect(databaseLink,{ user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
        console.log("MongoDb connection successful");}
).catch((err) => {
        console.log("MongoDb connection error is = " + err);}
)
