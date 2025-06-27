"use server";

import { Post } from "./models";
import { connectToDB } from "./utils";

export const getGuestCartItems = async (items) => {
  try {
    await connectToDB();
    const posts = await Post.find();
    const Items = [];

    items.forEach((item) => {
      const productId = item.productId;
      const post = posts.find((i) => i.id === productId);

      if (post) {
        const temp = {
          id: productId,
          title: post.title,
          image: post.image,
          price_selected: post.price[item.price_selected],
        };
        Items.push(temp);
      }
    });

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
    const Items = [];

    items.forEach((item) => {
      const productId = item.productId;
      const post = posts.find((i) => i.id === productId);

      if (post) {
        const temp = {
          id: productId,
          title: post.title,
          image: post.image,
          price_selected: post.price[item.price_selected],
        };
        Items.push(temp);
      }
    });

    return Items;
  } catch (err) {
    console.log("Can't fetch wishlist items from local storage", err);
    return [];
  }
};
