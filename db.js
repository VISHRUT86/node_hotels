const mongoose=require('mongoose');

// define mongodb connection url

const mongoURL='mongodb://localhost:27017/hotels' 


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