const express = require('express');
const router = express.Router();
const {check, validationResult}=require('express-validator');
const auth = require('../../middleware/authetification')
const Collection=require('../../models/Collection');
const User = require('../../models/User');
const { route } = require('./auth');
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const config = require("config");
const cloud_name = config.get("CLOUD_NAME");
const api_key = config.get("API_KEY");
const api_secret = config.get("API_SECRET");



cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
  


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+"-"+file.originalname)
  }
})
 
var upload = multer({ storage: storage })

//Create post
router.post('/',auth,upload.single('collectionImage') ,async(req,res)=>{


    //check('text','Text is required').not().isEmpty(),

    const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}
try {
    const user = await User.findById(req.user.id).select('-password');
    const result = await cloudinary.uploader.upload(req.file.path,res => console.log(res));

const newCollection = new Collection({
    text:req.body.text,
    name:user.name,
    collectionImage:result.secure_url,
    avatar:user.avatar,
    user:req.user.id
})
const collection = await newCollection.save()
res.json(collection)

} catch (err) {
    console.log(err)
    res.status(500).send('server error')
}
});


//get collections
router.get('/',auth,async(req,res)=>{
    try {
        const collections = await Collection.find().sort({date:-1})
        res.json(collections)
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})


//get collection by id 
router.get('/:id',auth,async(req,res)=>{
    try {
        const collection = await Collection.findById(req.params.id)
        if(!collection){
            return res.status(404).send('collection not found')
        }
        res.json(collection)
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

//delete collection
router.delete('/:id',auth,async(req,res)=>{
    try {
        const collection = await Collection.findById(req.params.id)
        if(collection.user.toString()!== req.user.id){
            return res.status(401).send('User not authorized')
        }
        await collection.delete();
        res.send('collection removed')
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

// likes of collection
router.put('/like/:id',auth,async(req,res)=>{
    try {
        const collection = await Collection.findById(req.params.id)

if(collection.likes.filter(like => like.user.toString()===req.user.id).length > 0){
    return res.status(400).send('Collection already liked')
}
//unshift put on the beginning
collection.likes.unshift({user:req.user.id})
await collection.save()
res.json(collection.likes)

    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

//unlike a collection
router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const collection = await Collection.findById(req.params.id)

if(collection.likes.filter(like => like.user.toString()===req.user.id).length === 0){
    return res.status(400).send('Collection not liked')
}
const removeIndex = collection.likes.map(like =>like.user.toString()).indexOf(req.user.id)
collection.likes.splice(removeIndex,1)
await collection.save()
res.json(collection.likes)

    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

//add comment
router.post('/comment/:id',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{

    const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}
try {
    const user = await User.findById(req.user.id).select('-password');
    const collection = await Collection.findById(req.params.id)

const newComment = {
    text:req.body.text,
    name:user.name,
    avatar:user.avatar,
    user:req.user.id
}
collection.comments.unshift(newComment)
await collection.save()
res.json(collection.comments)

} catch (err) {
    console.log(err)
    res.status(500).send('server error')
}
});


//delete comment
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try {
        const collection = await Collection.findById(req.params.id)
        const comment = collection.comments.find(comment => comment.id === req.params.comment_id)
        if(!comment){
            return res.status(404).send('Comment not found')
        }

if(comment.user.toString()!== req.user.id){
    return res.status(401).send('User not authorized')
}

      const removeIndex = collection.comments.map(comment =>comment.user.toString()).indexOf(req.user.id)
collection.comments.splice(removeIndex,1)
await collection.save()
res.json(collection.comments)
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})




module.exports = router;