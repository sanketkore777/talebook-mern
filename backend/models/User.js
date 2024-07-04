const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required!"],
  },
  profilePic: {
    type: String,
    default:
      "https://asset.cloudinary.com/talebook-posters/63be5a1f5dcfa5943f1bde13774c7d4d",
  },
  fullname: {
    type: String,
  },
  recentlyRead: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "story",
    },
  ],
  Stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "story",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "story",
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
