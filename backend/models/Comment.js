const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;
