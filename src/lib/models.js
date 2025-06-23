import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
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
const wishlistSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productIds: {
    type: Array,
  },
});

const cartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productIds: {
    type: Array,
  },
});

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  city: {
    type: String,
  },
  instaId: {
    type: String,
  },
});

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);
export const Wishlist =
  mongoose.models?.Wishlist || mongoose.model("Wishlist", wishlistSchema);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
