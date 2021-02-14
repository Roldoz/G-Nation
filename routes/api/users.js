const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator')
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')


router.post('/',[check('name','Name is required').not().isEmpty(),
check('email','Please include a valid Email').isEmail(),
check('password','Password must have more than 6 characters').isLength({min:6})
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {name,email,password,avatar} = req.body;
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

module.exports = router;