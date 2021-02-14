const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authetification');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Collection = require('../../models/Collection');

const{check,validationResult}=require('express-validator')

//get a profile
router.get('/me',auth,async(req,res)=>{
try {
    const profile= await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
    
    if(!profile){
        return res.status(400).json({msg:"No profile found"})
    }
    res.json(profile)
} catch (err) {
    console.log(err);
    res.status(500).send('server error')
}
});



//post new profile or modify if exists
router.post('/',[auth,[
    check('type','type is required').not().isEmpty(),
    check('platform','platform is required').not().isEmpty()

]],async(req,res)=>{

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}

const{type,platform,location,age,favoriteGames,bio,youtube,facebook,twitch,instagram}=req.body

const profileFields={};
profileFields.user=req.user.id;
if(type) profileFields.type=type;
if(platform) profileFields.platform=platform;
if(location) profileFields.location=location;
if(age) profileFields.age=age;
if(bio) profileFields.bio=bio;
if (favoriteGames) {
    profileFields.favoriteGames = favoriteGames.split(",").map(game => game.trim());
  }

profileFields.social={};
if(youtube) profileFields.social.youtube=youtube;
if(facebook) profileFields.social.facebook=facebook;
if(twitch) profileFields.social.twitch=twitch;
if(instagram) profileFields.social.instagram=instagram;

try {
    let profile= await Profile.findOne({user:req.user.id})
    if(profile){
        profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
        return res.json(profile);
    }
    
profile=new Profile(profileFields)
await profile.save()
res.json(profile)
} catch (err) {
    console.log(err)
    res.status(500).send('server error')
}
});


//get all profiles
router.get('/',async(req,res)=>{
    try {
const profiles= await Profile.find().populate('user',['name','avatar'])
res.json(profiles)
        
    } catch (err) {
        console.log(err);
    res.status(500).send('server error')
    }
})


//get profile by user id
router.get('/user/:user_id',async(req,res)=>{
    try {
const profile= await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
if(!profile){
    return res.status(400).json({msg:'Profile not found'})
}
res.json(profile)
return res.status(400).json({msg:'Profile not found'})
    } catch (err) {
if(err.kind == 'ObjectId'){

}
        console.log(err);
    res.status(500).send('server error')
    }
})

//delete user and profile
router.delete('/',auth,async(req,res)=>{
    try {
await Collection.deleteMany({user:req.user.id})
await Profile.findOneAndDelete({user:req.user.id})
await User.findOneAndDelete({_id:req.user.id})
res.json({msg:'User deleted'})
        
    } catch (err) {
        console.log(err);
    res.status(500).send('server error')
    }
})



module.exports = router;