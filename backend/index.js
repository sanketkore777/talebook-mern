const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./config/dbConfig");
const authRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");
const profileRoute = require("./routes/profileRoute");
const bodyParser = require("body-parser");
dbConnection();
const app = express();
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use("/auth", authRoute);
app.use("", homeRoute);
app.use(cors());
app.use(bodyParser.json());
app.use("/profile", profileRoute);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
