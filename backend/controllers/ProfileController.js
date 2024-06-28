const User = require("../models/User");
const jwt = require("../config/jwtProvider");
const cloudinary = require("../utils/cloudinary");
const handleFollowRequest = async (req, res) => {
  try {
    // Get the followee ID from the request body
    const { followeeId } = req.params;
    if (!followeeId) {
      return res.status(400).send({ error: "Followee ID is required!" });
    }

    const followerId = req.taleUser._id;

    // Find the follower and followee users
    const follower = await User.findById(followerId);
    const followee = await User.findById(followeeId);

    if (!follower || !followee) {
      return res.status(404).send({ error: "User not found!" });
    }

    // Check if the follower is already following the followee
    if (follower.followings.includes(followeeId)) {
      return res
        .status(400)
        .send({ error: "You are already following this user!" });
    }

    // Add the followee to the follower's followings list
    follower.followings.push(followeeId);

    // Add the follower to the followee's followers list
    followee.followers.push(followerId);

    // Save the updated users
    await follower.save();
    await followee.save();

    res.status(200).send({ message: "Successfully followed the user!" });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).send({ error: "Internal Server Error!" });
  }
};

const handleUnfollowRequest = async (req, res) => {
  try {
    // Get the followee ID from the request body
    const { followeeId } = req.params;
    if (!followeeId) {
      return res.status(400).send({ error: "Followee ID is required!" });
    }

    const followerId = req.taleUser._id;

    // Find the follower and followee users
    const follower = await User.findById(followerId);
    const followee = await User.findById(followeeId);

    if (!follower || !followee) {
      return res.status(404).send({ error: "User not found!" });
    }

    // Check if the follower is actually following the followee
    if (!follower.followings.includes(followeeId)) {
      return res
        .status(400)
        .send({ error: "You are not following this user!" });
    }

    // Remove the followee from the follower's followings list
    follower.followings = follower.followings.filter(
      (id) => id.toString() !== followeeId
    );

    // Remove the follower from the followee's followers list
    followee.followers = followee.followers.filter(
      (id) => id.toString() !== followerId
    );

    // Save the updated users
    await follower.save();
    await followee.save();

    res.status(200).send({ message: "Successfully unfollowed the user!" });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).send({ error: "Internal Server Error!" });
  }
};
const handleFollowingList = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate(
      "followings",
      " _id username email fullname"
    );

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    res.status(200).send(user.followings);
  } catch (error) {
    console.error("Error fetching followings list:", error);
    res.status(500).send({ error: "Internal Server Error!" });
  }
};

// Function to get the list of users that are following the specified user
const handleFollowerList = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate(
      "followers",
      " _id username profilePic fullname"
    );

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    res.status(200).send(user.followers);
  } catch (error) {
    console.error("Error fetching followers list:", error);
    res.status(500).send({ error: "Internal Server Error!" });
  }
};
const handleUploadProfilePic = async (req, res) => {
  try {
    const user = req.taleUser;

    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded!" });
    }
    const { path } = req.file;
    const result = await cloudinary.uploader
      .upload(path, { resource_type: "image" }, (error, result) => {
        if (error) {
          return res.status(500).send({ error: "Failed to upload image!" });
        }

        user.profilePic = result.secure_url;
        user.save();

        return res.status(200).send({
          message: "Profile picture updated successfully!",
          profilePic: user.profilePic,
        });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("Something went wrong!", error);
    return res.status(500).send({ error: "Internal Server Error!" });
  }
};
const handleSetFullname = async (req, res) => {
  try {
    const user = req.taleUser;
    user.fullname = req.body?.fullname;
    await user.save();
    res.status(201).send({ message: "Full name updated!" });
  } catch (error) {
    console.log(error),
      res.status(400).send({ error: "Something went wrong!" });
  }
};
const handleGetMyProfile = async (req, resp) => {
  try {
    const user = User.findById(req.taleUser._id).populate("Stories");
    resp.status(200).send({
      username: user.username,
      _id: user._id,
      fullName: user.fullname,
      profilePic: user.profilePic,
      stories: user.Stories,
      follwers: user.followers,
      followings: user.followings,
    });
  } catch (error) {}
};

module.exports = {
  handleGetMyProfile,
  handleUploadProfilePic,
  handleSetFullname,
  handleFollowRequest,
  handleUnfollowRequest,
  handleFollowerList,
  handleFollowingList,
};
