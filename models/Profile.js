const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  type: {
    type: String,
    required:true
  },
  platform: {
    type: String,
    required:true
  },
  location: {
    type: String
  },
  age: {
    type: Number
  },
  favoriteGames: {
    type: [String]
  },
  bio: {
    type: String
  },

  social: {
    youtube: {
      type: String
    },
    twitch: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
