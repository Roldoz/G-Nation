const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator')
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const config = require('config')
const auth = require('../../middleware/authetification')


router.post('/',[check('name','Name is required').not().isEmpty(),
check('email','Please include a valid Email').isEmail(),
check('password','Password must have more than 6 characters').isLength({min:6})
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
const avatar = req.body.avatar || 'https://t3.ftcdn.net/jpg/02/45/56/32/360_F_245563273_ta8nvwM7f82oYdE0efJwyP5rfVuNarWJ.jpg'
    const {name,email,password} = req.body;
try {
      let user = await User.findOne({email});
    //check user exists
    if(user){
        return res.status(400).json({errors :[{msg: 'User already exists'}]});
    }
//
user = new User({name,email,avatar, password})

//bcrypt
const salt = await bcrypt.genSalt(10)
user.password = await bcrypt.hash(password,salt)
//
await user.save();
//JWT
const payload={
    user:{
        id:user.id
    }
}
jwt.sign(payload,config.get('jwtSecret'),{expiresIn:400000},
(err,token)=>{
    if(err) console.log(err);
res.json({token})
})

     
} catch (err) {
    console.error(err.message);
    res.status(500).send('server error')
}
 
});


// change profile picture

router.put('/:id',auth,async(req, res) => {
   
      try {
          const avatar = req.body
  
    const updatedavatar= await User.findByIdAndUpdate(req.params.id,avatar,{ new: true },);
    res.json(updatedavatar)
      } catch (error) {
          console.log(error)
      }
  
    
  })




module.exports = router;