const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require("../middleware/multer.js");
const {
  handleGetMyProfile,
  handleSetFullname,
  handleFollowRequest,
  handleUnfollowRequest,
  handleFollowerList,
  handleFollowingList,
  handleUploadProfilePic,
} = require("../controllers/ProfileController.js");

const Router = express.Router();

Router.get("/", authMiddleware, handleGetMyProfile);
Router.post("/follow/:followeeId", authMiddleware, handleFollowRequest);
Router.post("/unfollow/:followeeId", authMiddleware, handleUnfollowRequest);
Router.get("/followings", authMiddleware, handleFollowingList);
Router.get("/followers", authMiddleware, handleFollowerList);
Router.post(
  "/setprofilepic",
  authMiddleware,
  upload.single("file"),
  handleUploadProfilePic
);
Router.post("/setfullname", authMiddleware, handleSetFullname);

module.exports = Router;
