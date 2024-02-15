const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmoongose = require("passport-local-mongoose");

const userSchema = new Schema({
  email : {
    type : String,
     required: true,
  }
})



userSchema.plugin(passportlocalmoongose);
module.exports = mongoose.model("User",userSchema);