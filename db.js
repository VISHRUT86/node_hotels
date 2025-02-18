const mongoose=require('mongoose');
require('dotenv').config();

// define mongodb connection url

const mongoURL = process.env.DB_URL;

// setup mongoose connection
mongoose.connect(mongoURL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
})


const db = mongoose.connection;

// define event listeners for database connections


db.on('connected',()=>{
    console.log('connected to mongoDB server');
})

db.on('error',()=>{
    console.log(' mongoDB connection error');
})
db.on('disconnected',()=>{
    console.log('momngoDB disconnected');
})

module.exports= db;