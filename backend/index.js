const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./config/dbConfig");
const authRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");
const profileRoute = require("./routes/profileRoute");
const storyRoute = require("./routes/fullStoryRoute");
const bodyParser = require("body-parser");
dbConnection();
const app = express();
const PORT = process.env.PORT || 6000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/home", homeRoute);
app.use("/profile", profileRoute);
app.use("/story", storyRoute);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
