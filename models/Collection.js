const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    collectionImage:{
        type:String,
        required:true
    },
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
            },
            name:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            },
            avatar:{
                type:String
            },
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports= Collection = mongoose.model('collection',CollectionSchema);