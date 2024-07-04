const User = require("../models/User");
const Story = require("../models/Story");
const handleGetStoryById = async (req, res) => {
  try {
    const { id } = req.query;
    const userId = req.taleUser._id;

    if (!id) {
      return res.status(400).send({ error: "Story ID is required" });
    }

    const story = await Story.findById(id)
      .populate("user", "username email fullname") // Populate user details
      .populate("tags"); // Populate tags if needed

    if (!story) {
      return res.status(404).send({ error: "Story not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send({ error: "Unauthorized user" });
    }

    const isLiked = story.likes.includes(userId);
    const isBookmarked = user.favorites.includes(story._id);

    res.status(200).send({
      story,
      isLiked,
      isBookmarked,
    });
  } catch (error) {
    console.error("Failed to fetch story:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.taleUser._id;

    console.log(postId, userId);
    const user = await User.findById(userId);
    const post = await Story.findById(postId);

    if (!user || !post) {
      return res.status(404).send({ error: "User or Post not found" });
    }

    if (!post.likes.includes(userId)) {
      user.likedStories.push(postId);
      await user.save();
    }

    res.status(200).send({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Failed to like post:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.taleUser._id;

    const user = await User.findById(userId);
    const post = await Story.findById(postId);

    if (!user || !post) {
      return res.status(404).send({ error: "User or Post not found" });
    }

    user.likedStories = user.likedStories.filter(
      (id) => id.toString() !== postId
    );
    await user.save();

    res.status(200).send({ message: "Post unliked successfully" });
  } catch (error) {
    console.error("Failed to unlike post:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.taleUser._id;

    const user = await User.findById(userId);
    const post = await Story.findById(postId);

    if (!user || !post) {
      return res.status(404).send({ error: "User or Post not found" });
    }

    if (!user.favorites.includes(postId)) {
      user.favorites.push(postId);
      await user.save();
    }

    res.status(200).send({ message: "Post added to favorites successfully" });
  } catch (error) {
    console.error("Failed to add post to favorites:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.taleUser._id;

    const user = await User.findById(userId);
    const post = await Story.findById(postId);

    if (!user || !post) {
      return res.status(404).send({ error: "User or Post not found" });
    }

    user.favorites = user.favorites.filter((id) => id.toString() !== postId);
    await user.save();

    res
      .status(200)
      .send({ message: "Post removed from favorites successfully" });
  } catch (error) {
    console.error("Failed to remove post from favorites:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const Comment = require("../models/Comment");

const handleMakeComment = async (req, res) => {
  try {
    const { storyId, body } = req.body;
    const userId = req.taleUser._id; // Assuming req.taleUser contains the authenticated user

    // Find the story to comment on
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).send({ error: "Story not found" });
    }

    // Create a new comment
    const comment = new Comment({
      body,
      user: userId,
    });

    // Save the comment
    await comment.save();

    // Add the comment to the story's comments array
    story.comments.push(comment._id);
    await story.save();

    res.status(201).send({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error("Failed to add comment:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const handleDeleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.taleUser._id;

    // Find the comment to delete
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({ error: "Comment not found!" });
    }

    // Check if the comment belongs to the user
    if (comment.user.toString() !== userId) {
      return res.status(403).send({ error: "Unauthorized action!" });
    }

    // Remove the comment from the story's comments array
    await Story.updateOne(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).send({ message: "Comment deleted successfully!" });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).send({ error: "Internal Server Error!" });
  }
};

module.exports = {
  handleDeleteComment,
  handleGetStoryById,
  handleMakeComment,
  likePost,
  unlikePost,
  addToFavorites,
  removeFromFavorites,
};
