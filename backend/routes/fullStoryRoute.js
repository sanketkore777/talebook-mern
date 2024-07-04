const Router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  likePost,
  unlikePost,
  addToFavorites,
  removeFromFavorites,
  handleMakeComment,
  handleDeleteComment,
} = require("../controllers/storyController");

Router.post("/like/:id", authMiddleware, likePost);
Router.post("/unlike", authMiddleware, unlikePost);
Router.post("/add-to-favorites", authMiddleware, addToFavorites);
Router.post("/remove-from-favorites", authMiddleware, removeFromFavorites);
Router.post("/comment", authMiddleware, handleMakeComment);
Router.delete("/comment", authMiddleware, handleDeleteComment);

module.exports = Router;
