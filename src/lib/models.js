import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
