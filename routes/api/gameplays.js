const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const auth = require('../../middleware/authetification');
const User = require('../../models/User');
const Gameplay=require('../../models/Gameplay');
const {check,validationResult}=require('express-validator');



//Create gameplay video
router.post('/',[auth ,[check('title','Title is required').not().isEmpty(),
check('url','Url is required').not().isEmpty()]] ,async(req,res)=>{

    const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}

try {
    
const newGameplay = new Gameplay({
    
    title:req.body.title,
    url:req.body.url,
    user:req.user.id
})
const gameplay= await newGameplay.save()
res.json(gameplay)

} catch (err) {
    console.log(err)
    res.status(500).send('server error')
}
});


// get all gameplays
router.get('/',auth,async(req,res)=>{
    try {
        const gameplays = await Gameplay.find().populate('user',['name'])
        // .sort({date:-1})
        res.json(gameplays)
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

//delete gameplay
router.delete('/:id',auth,async(req,res)=>{
    try {
        const gameplay = await Gameplay.findById(req.params.id)
        if(gameplay.user.toString()!== req.user.id){
            return res.status(401).send('User not authorized')
        }
        await gameplay.delete();
        res.send('gameplay removed')
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})






module.exports = router;