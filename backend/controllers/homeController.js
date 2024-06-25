const Story = require("../models/Story");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const jwt = require("../config/jwtProvider");
const Tag = require("../models/Tag");

const handleHomeRequest = async (req, res) => {
  try {
    let { pageNo, search, tag, pageSize } = req.query;
    pageSize = parseInt(pageSize) || 15;
    pageNo = parseInt(pageNo) || 1;

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]; // Case-insensitive search on title and content
    }
    if (tag) {
      query.tags = tag; // Filter by tag
    }

    // Fetch the stories with pagination
    const stories = await Story.find(query)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const totalStories = await Story.countDocuments(query);
    res.status(200).json({
      totalPages: Math.ceil(totalStories / pageSize),
      totalStories,
      stories,
    });
  } catch (error) {
    console.log("Server failed to fetch stories");
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

    const token = req.headers?.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "No token provided!" });
    }

    const _id = await jwt.authenticateJwtToken(token);
    if (!_id) {
      return res.status(401).send({ error: "Invalid token!" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send({ error: "Unauthorized user!" });
    }

    const result = await cloudinary.uploader.upload(path, {
      resource_type: "auto",
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
    res.status(201).send({ message: "Created!" });
  } catch (error) {
    console.error("Something went wrong!", error);
    if (!res.headersSent) {
      res.status(500).send({ error: "Request failed!" });
    }
  }
};
const handleDeletePost = async (req, res) => {
  try {
    const { storyid } = req.params; // Assuming postId is passed as a URL parameter
    const token = req.headers?.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({ error: "No token provided!" });
    }

    const _id = await jwt.authenticateJwtToken(token);
    if (!_id) {
      return res.status(401).send({ error: "Invalid token!" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send({ error: "Unauthorized user!" });
    }

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

module.exports = { handleHomeRequest, handleNewPostRequest, handleDeletePost };
