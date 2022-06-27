const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: String,
    decision: {type: Schema.Types.ObjectId, ref: "Decision"},
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;