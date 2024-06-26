const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min:2,
      max:50,
    },
    lastName: {
      type: String,
      required: true,
      min:2,
      max:50,
    },
    email: {
      type: String,
      required : true,
      unique:true,
      max:50
    },
    password: {
      type: String,
      required: true,
      min:5,
    },
    picturePath: {
        type: String,
        default:''
    },
    freinds: {
       type:Array,
       default:[] 
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions:Number,
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);