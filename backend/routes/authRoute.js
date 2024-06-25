const Router = require("express").Router();
const User = require("../models/User");
const { generateJwtToken } = require("../config/jwtProvider");

const handleSignin = async (req, resp) => {
  try {
    const identifier = req.body?.taleId;
    const password = req.body?.password;
    let user;
    user = await User.findOne({ username: identifier });
    if (!user) user = await User.findOne({ email: identifier });
    if (!user) return resp.send({ error: "User does not exist!" });

    if (password !== user.password) {
      console.log(user, identifier, password, req.body);
      return resp.send({ error: "Wrong password!" });
    }
    const token = await generateJwtToken({ id: user[0]._id });
    return resp.send({ token: token, message: "Signin successful!" });
  } catch (error) {
    console.log(error);
    return resp.send({ error: "Internal server error!" });
  }
};

const handleSignup = async (req, resp) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return resp.send({ error: "Fill all the fields!" });
    let isExist = await User.findOne({ username });
    if (isExist) return resp.send({ error: "username already exists" });
    isExist = User.findOne({ email });
    if (isExist) return resp.send({ error: "email already exists" });
    const _user = new User({ username, email, password });
    await _user.save();
    return resp.send({
      message: "Signup Successful",
      status: "Account created!",
    });
  } catch (error) {
    console.log(error);
    return resp.send({ error: "server error!" });
  }
};

Router.post("/signin", handleSignin);
Router.post("/signup", handleSignup);

module.exports = Router;
