const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');



//CRUD for menu ITEms

//CREATE
router.post('/',async(req,res)=>{
    try{
      const data = req.body  // assuming the request body contains the menu data
  
    // create new menu
  
    const newMenu = await new Menu(data);
    //  save the newmenu
  
    const response= await  newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
   
  })
  

  //READ
  router.get('/',async(req,res)=>{
    try{
      const data = await Menu.find();
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
      }
    })
  

    router.get('/:taste',async(req,res)=>{
        try{
          const taste = req.params.taste;
          if(taste=='sweets'|| taste=='spicy'||taste=='sour'){
          const response = await Menu.find({taste:taste});
          console.log('response fetched');
          res.status(200).json(response);
        }
        else{
          res.status(404).json({error:"Invalid work type"})
        }
      }
      catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
      }
      })

      //EDIT or update
       router.put('/:id',async(req,res)=>{
        try{
          const itemId = req.params.id;
          const updatedItemdata = req.body;

          const response = await Menu.findByIdAndUpdate(itemId,updatedItemdata,{
            new:true,
            runValidators:true,
          })
          if (!response) {
            return res.status(404).json({ error: "Person not found" });
          }
          console.log("Data updated");
          res.status(200).json(response);
        }
         catch (err) {
          console.log(err);
          res.status(500).json({ error: "Internal server error" });
        }
       })


       //DELETE

       router.delete('/:id',async(req,res)=>{
        try{
          const itemId = req.params.id;

          const response = await Menu.findByIdAndDelete(itemId);
          if (!response) {
            return res.status(404).json({ error: "Person not found" });
          }
          console.log("Data deleted");
          res.status(200).json(response);
          
        }catch(err){
          console.log(err);
           res.status(500).json({error:"Internal server error"});
        }
       })



    module.exports = router;