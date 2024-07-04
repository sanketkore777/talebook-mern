const Story = require("../models/Story");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const jwt = require("../config/jwtProvider");
const Tag = require("../models/Tag");

const handleHomeRequest = async (req, res) => {
  try {
    let { pageNo, pageSize } = req.query;
    pageSize = parseInt(pageSize) || 15;
    pageNo = parseInt(pageNo) || 1;

    // Fetch the stories with pagination
    const stories = await Story.find({})
      .limit(pageSize * pageNo)
      .populate("tags")
      .populate("user")
      .exec();

    const totalStories = await Story.countDocuments();
    res.status(200).json({
      totalPages: Math.ceil(totalStories / pageSize),
      totalStories,
      stories,
    });
  } catch (error) {
    console.log("Server failed to fetch stories", error);
    res.status(500).send({ error: "Internal Server Error!" });
  }
};

const handleNewPostRequest = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded!" });
    }

    const { path } = req.file;
    let { title, body, description, tags } = req.body; // Use req.body to get the request body
    if (typeof tags === "string") tags = tags.split(",");
    const user = req.taleUser;

    const result = await cloudinary.uploader.upload(path, {
      resource_type: "image",
    });
    if (!result.secure_url) {
      return res
        .status(500)
        .send({ error: "Failed to upload image, try again" });
    }

    let idsOfTag = [];
    for (let tag of tags) {
      let _tag = await Tag.findOne({ tag });
      if (_tag) {
        _tag.postCount += 1;
        const updatedTag = await _tag.save();
        idsOfTag.push(updatedTag._id);
      } else {
        _tag = new Tag({ tag, postCount: 1 });
        const newTag = await _tag.save();
        idsOfTag.push(newTag._id);
      }
    }

    const story = new Story({
      title,
      body,
      description,
      user: user._id,
      tags: idsOfTag,
      poster: result.secure_url,
    });

    await story.save();
    return res.status(201).send({ message: "Created!" });
  } catch (error) {
    console.error("Something went wrong!", error);
    return res.status(500).send({ error: "Request failed!" });
  }
};
const handleDeletePost = async (req, res) => {
  try {
    const { storyid } = req.params; // Assuming postId is passed as a URL parameter

    const user = req.taleUser;

    const story = await Story.findById(storyid);
    if (!story) {
      return res.status(404).send({ error: "Post not found!" });
    }

    if (story.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .send({ error: "You are not authorized to delete this post!" });
    }

    // Extract the public ID from the Cloudinary URL
    const secureUrl = story.poster;
    const publicId = secureUrl.match(/\/(?:v\d+\/)?([^/]+)\.[^/.]+$/)[1];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

    // Update tags
    const tags = story.tags;
    for (let tagId of tags) {
      const tag = await Tag.findById(tagId);
      if (tag) {
        tag.postCount -= 1;
        if (tag.postCount <= 0) {
          await tag.remove();
        } else {
          await tag.save();
        }
      }
    }

    // Delete the post
    await Story.findByIdAndDelete(storyid);

    res.status(200).send({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error("Something went wrong!", error);
    if (!res.headersSent) {
      res.status(500).send({ error: "Request failed!" });
    }
  }
};

const handleSearch = async (req, res) => {
  try {
    const { searchTerm } = req.params;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required!" });
    }

    const userQuery = {
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { fullname: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const users = await User.find(userQuery).select(
      "username email fullname profilePic"
    );

    // Case-insensitive search for stories by title or description
    const storyQuery = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const stories = await Story.find(storyQuery).select(
      "title description poster"
    );

    res.status(200).json({
      users,
      stories,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const handleUserRecommendation = async (req, res) => {
  try {
    const userId = req.taleUser._id;

    const user = await User.findById(userId).populate(
      "followers",
      "username email fullname profilePic"
    );

    if (!user) {
      return res.status(401).json({ error: "Unauthorized user!" });
    }

    let recommendedUsers;

    if (user.followers.length > 0) {
      const followerIds = user.followers.map((follower) => follower._id);

      recommendedUsers = await User.find({
        _id: { $in: followerIds },
        _id: { $ne: userId },
      }).select("username email fullname profilePic");
    } else {
      recommendedUsers = await User.aggregate([
        { $match: { _id: { $ne: userId } } },
        { $sample: { size: 10 } },
      ]).project("username email fullname profilePic");
    }

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

module.exports = {
  handleUserRecommendation,
  handleHomeRequest,
  handleNewPostRequest,
  handleDeletePost,
  handleSearch,
};
