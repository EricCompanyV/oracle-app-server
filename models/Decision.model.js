const { Schema, model } = require("mongoose");

const decisionSchema = new Schema(
  {
    name: String,
    description: String,
    options: [String],
    criteria: [{ name: String, weight: Number, option: String }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    result: Boolean,
    isPublic: Boolean,
  },
  {
    timestamps: true,
  }
);

const Decision = model("Decision", decisionSchema);

module.exports = Decision;
