const { Schema, model } = require("mongoose");

const decisionSchema = new Schema(
  {
    name: String,
    description: String,
    options: [String],
    criteria: [String],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    result: boolean,
    isPublic: boolean,
  },
  {
    timestamps: true,
  }
);

const Decision = model("Decision", decisionSchema);

module.exports = Decision;