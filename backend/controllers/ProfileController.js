const User = require("../models/User");
const jwt = require("../config/jwtProvider");

const handleFollowRequest = async (req, res) => {
  try {
    // Get the followee ID from the request body
    const { followeeId } = req.params;
    if (!followeeId) {
      return res.status(400).send({ error: "Followee ID is required!" });
    }

    // Get the token from the authorization header
    const token = req.headers?.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "No token provided!" });
    }

    // Authenticate the JWT token
    const followerId = await jwt.authenticateJwtToken(token);
    if (!followerId) {
      return res.status(401).send({ error: "Invalid token!" });
    }

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

    // Get the token from the authorization header
    const token = req.headers?.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "No token provided!" });
    }

    // Authenticate the JWT token
    const followerId = await jwt.authenticateJwtToken(token);
    if (!followerId) {
      return res.status(401).send({ error: "Invalid token!" });
    }

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
      "username email fullname"
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
      "username email fullname"
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
module.exports = {
  handleFollowRequest,
  handleUnfollowRequest,
  handleFollowerList,
  handleFollowingList,
};
