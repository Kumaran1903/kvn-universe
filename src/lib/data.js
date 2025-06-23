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
    revalidatePath("/");
  } catch (err) {
    console.log("Error Adding to Cart", err);
  }
};

export const getWishListItems = async (userId) => {
  try {
    await connectToDB();
    const wishlist = await Wishlist.findOne({ userId: userId });
    const productIds = wishlist ? wishlist.productIds : [];
    if (productIds.length === 0) return [];
    const posts = await getPosts();
    const filteredPosts = posts.filter((post) => productIds.includes(post.id));
    return filteredPosts;
  } catch (err) {
    console.log("Error fetching Wislists items", err);
  }
};

export const addOrDeleteWishlist = async (formData) => {
  const { userId, productId } = Object.fromEntries(formData);
  console.log(userId,"****", productId);
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
  const { userId, productId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const wishlist = await Wishlist.findOne({ userId: userId });
    const index = wishlist.productIds.indexOf(productId);
    wishlist.productIds.splice(index, 1);
    await wishlist.save();
    await Post.findByIdAndUpdate(
      { _id: productId },
      { $set: { favorite: false } }
    );
    revalidatePath("/");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Removing Wishlist item", err);
  }
};

export const removeFromWishListAddToCart = async (formData) => {
  const { userId, productId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    //remove from wishlist
    const wishlist = await Wishlist.findOne({ userId: userId });
    const index = wishlist.productIds.indexOf(productId);
    wishlist.productIds.splice(index, 1);
    await wishlist.save();
    //add to cart
    const cart = await Cart.findOne({ userId: userId });
    if (cart) {
      if (!cart.productIds.includes(productId)) {
        cart.productIds.push(productId);
        // update post favorite status
        await Post.findByIdAndUpdate(
          { _id: productId },
          { $set: { favorite: false } }
        );
      }
      await cart.save();
    } else {
      await Cart.create({ userId: userId, productIds: [productId] });
    }
    revalidatePath("/");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Adding Cart item", err);
  }
};

export const getCartItems = async (userId) => {
  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId: userId });
    const productIds = cart ? cart.productIds : [];
    if (productIds.length === 0) return [];
    const posts = await getPosts();
    const filteredPosts = posts.filter((post) => productIds.includes(post.id));
    return filteredPosts;
  } catch (err) {
    console.log("Error fetching Cart items", err);
  }
};

export const removeFromCart = async (formData) => {
  const { userId, productId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId: userId });
    const index = cart.productIds.indexOf(productId);
    cart.productIds.splice(index, 1);
    await cart.save();
    revalidatePath("/");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Removing Cart item", err);
  }
};

export const addWishlistDeleteCart = async (formData) => {
  const { userId, productId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    //remove from cart
    const cart = await Cart.findOne({ userId: userId });
    const index = cart.productIds.indexOf(productId);
    cart.productIds.splice(index, 1);
    await cart.save();
    //add to wishlist
    const wishlist = await Wishlist.findOne({ userId: userId });
    if (wishlist) {
      if (!wishlist.productIds.includes(productId)) {
        wishlist.productIds.push(productId);
        // update post favorite status
        await Post.findByIdAndUpdate(
          { _id: productId },
          { $set: { favorite: true } }
        );
      }
      await wishlist.save();
    } else {
      await Wishlist.create({ userId: userId, productIds: [productId] });
    }
    revalidatePath("/");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Moving item to WishList", err);
  }
};
