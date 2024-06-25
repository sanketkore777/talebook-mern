const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  postCount: {
    type: Number,
    default: 0,
  },
});

const TagModel = mongoose.model("tag", TagSchema);
module.exports = TagModel;
