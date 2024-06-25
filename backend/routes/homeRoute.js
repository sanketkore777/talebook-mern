const Router = require("express").Router();
const upload = require("../middleware/multer");
const {
  handleHomeRequest,
  handleNewPostRequest,
  handleDeletePost,
} = require("../controllers/homeController");

Router.get("/home", handleHomeRequest);
Router.post("/home/newstory", upload.single("file"), handleNewPostRequest);
Router.post("/home/deletestory/:storyid", handleDeletePost);

module.exports = Router;
