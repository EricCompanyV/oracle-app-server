const { Schema, model } = require("mongoose");

const decisionSchema = new Schema(
  {
    content: String,
    decision: {type: Schema.Types.ObjectId, ref: "Decision"},
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const Decision = model("Decision", decisionSchema);

module.exports = Decision;