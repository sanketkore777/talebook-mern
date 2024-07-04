const Router = require("express").Router();
const upload = require("../middleware/multer");
const authMiddleware = require("../middleware/authMiddleware");
const {
  handleHomeRequest,
  handleNewPostRequest,
  handleDeletePost,
  handleSearch,
  handleUserRecommendation,
} = require("../controllers/homeController");

Router.get("/", authMiddleware, handleHomeRequest);
Router.post(
  "/newstory",
  authMiddleware,
  upload.single("file"),
  handleNewPostRequest
);
Router.post("/deletestory/:storyid", authMiddleware, handleDeletePost);
Router.get("/search/:searchTerm", authMiddleware, handleSearch);
Router.get("/recommendations", authMiddleware, handleUserRecommendation);

module.exports = Router;
