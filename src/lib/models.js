import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    personal: {
      type: Number,
      default: 0,
    },
    commercial: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Number,
      default: 0,
    },
  },
});
const wishlistSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
      },
      favorite: {
        type: Boolean,
      },
    },
  ],
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
    sparse: true,
  },
  city: {
    type: String,
  },
  instaId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const priceSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  usePrice: [
    {
      _id: false,
      productId: {
        type: String,
      },
      price_selected: {
        type: String,
        enum: ["personal", "commercial"],
      },
    },
  ],
});

const templateSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

export const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);

export const Wishlist =
  mongoose.models?.Wishlist || mongoose.model("Wishlist", wishlistSchema);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);

export const UserPricing =
  mongoose.models?.UserPricing || mongoose.model("UserPricing", priceSchema);

export const Templates =
  mongoose.models?.Templates || mongoose.model("Templates", templateSchema);
