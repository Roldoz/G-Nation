const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const auth = require('../../middleware/authetification')
const Game=require('../../models/Game');
const User = require('../../models/User');


//Create post
router.post('/',auth,async(req,res)=>{

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()})
    // }
    

try {
    
const newGame = new Game({
    
    name:req.body.name,
    type:req.body.type,
    photo:req.body.photo,
    description:req.body.description,
    user:req.user.id
})
const game = await newGame.save()
res.json(game)

} catch (err) {
    console.log(err)
    res.status(500).send('server error')
}
});


//get games
router.get('/',auth,async(req,res)=>{
    try {
        const games = await Game.find()
        // .sort({date:-1})
        res.json(games)
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

//update game
router.put('/:id',auth,async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
       return res.status(400).send("ID unknown : " + req.params.id); 
    }
      
  
    const game = req.body 
  
    const updatedGame= await Game.findByIdAndUpdate(req.params.id,game,{ new: true },);
    res.json(updatedGame)
  })

//delete game
router.delete('/:id',auth,async(req,res)=>{
    try {
        const game = await Game.findById(req.params.id)
        if(game.user.toString()!== req.user.id){
            return res.status(401).send('User not authorized')
        }
        await game.delete();
        res.send('game removed')
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

// likes of game
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const game = await Game.findById(req.params.id)

if(game.likes.filter(like => like.user.toString()===req.user.id).length > 0){
    return res.status(400).send('Collection already liked')
}
//unshift put on the beginning
game.likes.unshift({user:req.user.id})
await game.save()
res.json(game.likes)

    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

// unlikes of game
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const game = await Game.findById(req.params.id)

if(game.unlikes.filter(like => like.user.toString()===req.user.id).length > 0){
    return res.status(400).send('Collection already disliked')
}
//unshift put on the beginning
game.unlikes.unshift({user:req.user.id})
await game.save()
res.json(game.unlikes)

    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})


module.exports = router;