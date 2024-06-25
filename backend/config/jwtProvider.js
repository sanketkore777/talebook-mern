const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const SECRET = process.env.JWT_SECRETE_KEY;
const generateJwtToken = async (id) => {
  const token = await jwt.sign(id, SECRET, { expiresIn: "24h" });
  return token;
};

const authenticateJwtToken = async (token) => {
  const isMatch = await jwt.verify(token, SECRET);
  return isMatch?.id || 0;
};

module.exports = { generateJwtToken, authenticateJwtToken };
