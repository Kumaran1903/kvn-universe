"use server";

import { revalidatePath } from "next/cache";
import { Cart, Post, Wishlist } from "./models";
import { connectToDB } from "./utils";

export const getPosts = async () => {
  try {
    await connectToDB();
    const posts = await Post.find();
    const refinedPosts = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      cost: post.cost,
      favorite: post.favorite,
      image: post.image,
    }));
    return refinedPosts;
  } catch (err) {
    console.log("Error Fetching Posts", err);
  }
};

export const addToCart = async (formData) => {
  const { userId, productId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId: userId });
    if (cart) {
      if (!cart.productIds.includes(productId)) {
        cart.productIds.push(productId);
      }
      await cart.save();
    } else {
      await Cart.create({ userId: userId, productIds: [productId] });
    }
  } catch (err) {
    console.log("Error Adding to Cart", err);
  }
};

export const getWishListItems = async (formData) => {
  const { userId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const posts = await Wishlist.find();
    const refinedItems = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      cost: post.cost,
      image: post.image,
    }));
    return refinedItems;
  } catch (err) {
    console.log("Error fetching Wislists items", err);
  }
};

export const addOrDeleteWishlist = async (formData) => {
  const { userId, productId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const wishlist = await Wishlist.findOne({ userId: userId });
    if (wishlist) {
      const index = wishlist.productIds.indexOf(productId);
      if (index === -1) {
        wishlist.productIds.push(productId);
        await Post.findByIdAndUpdate(
          { _id: productId },
          { $set: { favorite: true } }
        );
      } else {
        wishlist.productIds.splice(index, 1);
        await Post.findByIdAndUpdate(
          { _id: productId },
          { $set: { favorite: false } }
        );
      }
      await wishlist.save();
    } else {
      await Wishlist.create({ userId: userId, productIds: [productId] });
    }
    revalidatePath("/");
    revalidatePath("/store");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Adding or Removing WishList item", err);
  }
};

export const removeFromWishlist = async (formData) => {
  const { title } = Object.fromEntries(formData);
  try {
    await Post.findOneAndUpdate(
      { title: title },
      { $set: { favorite: false } }
    );
    await Wishlist.findOneAndDelete({ title: title });
    revalidatePath("/");
    revalidatePath("/store");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Removing Wishlist item", err);
  }
};

export const removeFromWishListAddToCart = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const post = await Wishlist.findById(id);

    // delete from wishlist
    await Wishlist.findByIdAndDelete(id);

    // /unfavorite in post
    await Post.findOneAndUpdate(
      { title: post.title },
      { $set: { favorite: false } }
    );
    // add that product to the cart if not exists
    const temp = await Cart.findOne({ title: post.title });
    if (temp) {
      revalidatePath("/");
      revalidatePath("/store");
      revalidatePath("/cart");
      return;
    }
    await Cart.create({
      title: post.title,
      cost: post.cost,
      image: post.image,
    });
    revalidatePath("/");
    revalidatePath("/store");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Adding Cart item", err);
  }
};

export const getCartItems = async () => {
  try {
    await connectToDB();
    const posts = await Cart.find();
    const refinedItems = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      cost: post.cost,
      image: post.image,
    }));
    return refinedItems;
  } catch (err) {
    console.log("Error fetching Cart items", err);
  }
};

export const removeFromCart = async (formData) => {
  const { title } = Object.fromEntries(formData);
  try {
    await Cart.findOneAndDelete({ title: title });
    revalidatePath("/");
    revalidatePath("/store");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Removing Cart item", err);
  }
};

export const addWishlistDeleteCart = async (formData) => {
  const { title } = Object.fromEntries(formData);
  try {
    const temp = await Wishlist.findOne({ title: title });
    if (temp) {
      await Cart.findOneAndDelete(title);
      revalidatePath("/");
      revalidatePath("/store");
      revalidatePath("/cart");
      return;
    }
    const post = await Post.findOne({ title: title });
    await Wishlist.create({
      title: post.title,
      cost: post.cost,
      image: post.image,
    });
    await Post.findOneAndUpdate(
      { title: post.title },
      { $set: { favorite: true } }
    );
    await Cart.findOneAndDelete({ title: title });
    revalidatePath("/");
    revalidatePath("/store");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Moving item to WishList", err);
  }
};
