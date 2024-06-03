const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    picturePath: String,
    userPicturePath: String,
    location: String,
    description: String,
    likes : {
        type:Map,
        of: Boolean,
    },
    comments : {
        type:Array,
        default:[]
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);