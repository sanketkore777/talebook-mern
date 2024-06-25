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
  Stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  follwings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
