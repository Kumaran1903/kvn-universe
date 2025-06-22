"use server";

import { Post } from "./models";
import { connectToDB } from "./utils";

export const getGuestCartItems = async (items) => {
  try {
    await connectToDB();
    const posts = await Post.find();
    const cartItems = posts.filter((item) =>
      items.includes(item._id.toString())
    );
    const Items = cartItems.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      cost: item.cost,
      image: item.image,
    }));
    return Items;
  } catch (err) {
    console.log("Can't fetch cart items from local storage", err);
    return [];
  }
};

export const getGuestWishListItems = async (items) => {
  try {
    await connectToDB();
    const posts = await Post.find();
    const WishListItems = posts.filter((item) =>
      items.includes(item._id.toString())
    );
    const Items = WishListItems.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      cost: item.cost,
      image: item.image,
    }));
    return Items;
  } catch (err) {
    console.log("Can't fetch wishlist items from local storage", err);
    return [];
  }
};
