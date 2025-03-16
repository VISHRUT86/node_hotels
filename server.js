
const express = require('express');
const app = express();
const db =require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;
const Passport = require('./auth');


//middleware function 
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] request Made to : ${req.originalUrl}`);
  next(); //move on to the next phase
}

// .......> ye sirf '/' iss pr hi logrequest bhejega or fir middleware function ko chlayega
// app.get('/', logRequest,function (req, res) {
//   res.send('Welcome to my Hotel...')                
// })


// ...===> ye hr url pr log request bhejega jese '/','/person','/menu' and all ...
app.use(logRequest);


app.use(Passport.initialize());
const localAuthMiddleware = Passport.authenticate('local',{session:false});
app.get('/', function (req, res) {
  res.send('Welcome to our Hotel...')
})
  // import the person routes
  const personRoutes = require('./routes/personRoutes');
  const menuRoutes = require('./routes/menuRoutes');

  // use the routes
  app.use('/person',personRoutes);
  app.use('/menu',localAuthMiddleware,menuRoutes);


app.listen(PORT,()=>{
  console.log(" listening on port =3000")
})