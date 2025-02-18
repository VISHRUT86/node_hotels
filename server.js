
const express = require('express')
const app = express()
const db =require('./db')

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;


const menu = require('./models/menu');



app.get('/', function (req, res) {
  res.send('Welcome to my Hotel...')
})
  // import the person routes
  const personRoutes = require('./routes/personRoutes');
  const menuRoutes = require('./routes/menuRoutes');


  // use the routes
  app.use('/person',personRoutes);
  app.use('/menu',menuRoutes);


app.listen(PORT,()=>{
  console.log(" listening on port =3000")
})