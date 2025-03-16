const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

Passport.use(new LocalStrategy(async (userName,password,done) => {
    //authentication logic here
    try{
        //  console.log('Received credentials:',userName,password);
         const user = await Person.findOne({username:userName});
         if(!user){
          return done(null,false,{message:'Incorrect Username.'});
         }
  
         const isPasswordMatch =await user.comparePassword(password);
  
         if(isPasswordMatch){
          return done(null,user);
         }
         else {
          return done(null,false,{message:'Incorrect password.'});
         }
    }catch(err){
      return done(err)
  
    }
  }));
module.exports = Passport;