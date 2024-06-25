const express = require("express");
const {
  handleFollowRequest,
  handleUnfollowRequest,
  handleFollowerList,
  handleFollowingList,
} = require("../controllers/ProfileController");
const Router = express.Router();

Router.post("/follow/:followeeId", handleFollowRequest);
Router.post("/unfollow/:followeeId", handleUnfollowRequest);
Router.post("/followings/:id", handleFollowingList);
// Router.post("/followers/:id", handleFollowerList);
// Router.post("/followers/:id", handleFollowerList);
// Router.post("/followers/:id", handleFollowerList);

module.exports = Router;
