const jwt = require("../config/jwtProvider");
const User = require("../models/User");
const authMiddleware = async (req, res, next) => {
  try {
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

    req.taleUser = user; // Attach user info to the request object
    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).send({ error: "Authentication error!" });
  }
};

module.exports = authMiddleware;
