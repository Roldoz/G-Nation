const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameplaysSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
});

module.exports = Gameplays = mongoose.model("gameplay", GameplaysSchema);
