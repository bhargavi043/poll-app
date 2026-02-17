import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  option: String,
});

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  options: [optionSchema],
  votes: [voteSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Poll", pollSchema);
