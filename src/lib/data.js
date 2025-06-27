"use server";

import { revalidatePath } from "next/cache";
import { Cart, Post, UserPricing, Wishlist } from "./models";
import { connectToDB } from "./utils";

export const getPosts = async () => {
  try {
    await connectToDB();
    const posts = await Post.find();
    const refinedPosts = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      image: post.image,
      price: {
        personal: post.price.personal,
        commercial: post.price.commercial,
      },
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
    const wishlist = await Wishlist.findOne({ userId });
    const products = wishlist?.products || [];
    if (products.length === 0) return [];

    const posts = await getPosts();
    const filteredPosts = [];

    for (const item of posts) {
      if (products.find((i) => i.productId === item.id)) {
        const selectedPrice = await getUserSelectedPrice(userId, item.id);
        filteredPosts.push({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price?.[selectedPrice] || item.price?.personal,
        });
      }
    }

    return filteredPosts;
  } catch (err) {
    console.log("Error fetching Wishlist items", err);
    return [];
  }
};

export const addOrDeleteWishlist = async (formData) => {
  const { userId, productId } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const wishlist = await Wishlist.findOne({ userId: userId });
    if (wishlist) {
      const index = wishlist.products.findIndex(
        (item) => item.productId === productId
      );
      if (index === -1) {
        wishlist.products.push({ productId, favorite: true });
      } else {
        wishlist.products.splice(index, 1);
      }
      await wishlist.save();
    } else {
      await Wishlist.create({
        userId: userId,
        products: [{ productId, favorite: true }],
      });
    }
    revalidatePath("/store");
    revalidatePath("/");
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
    const index = wishlist.products.findIndex(
      (item) => item.productId === productId
    );
    wishlist.products.splice(index, 1);
    await wishlist.save();

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
    const index = wishlist.products.findIndex(
      (item) => item.productId === productId
    );
    wishlist.products.splice(index, 1);
    await wishlist.save();
    //add to cart
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
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Adding Cart item", err);
  }
};

export const getFavorite = async (userId, productId) => {
  try {
    const wishlist = await Wishlist.findOne({ userId });
    const favorites = wishlist?.products || [];
    return favorites.some((item) => item.productId === productId);
  } catch (err) {
    console.log("Error fetching Favorites", err);
    return false;
  }
};

export const getCartItems = async (userId) => {
  try {
    await connectToDB();
    const cart = await Cart.findOne({ userId });
    const productIds = cart?.productIds || [];
    if (productIds.length === 0) return [];

    const posts = await getPosts();
    const filteredPosts = [];

    for (const item of posts) {
      if (productIds.includes(item.id)) {
        const selectedPrice = await getUserSelectedPrice(userId, item.id);
        filteredPosts.push({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price?.[selectedPrice] || item.price?.personal,
        });
      }
    }

    return filteredPosts;
  } catch (err) {
    console.error("Error fetching Cart items", err);
    return [];
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
      const index = wishlist.products.findIndex(
        (item) => item.productId === productId
      );
      if (index === -1) {
        wishlist.products.push({ productId, favorite: true });
      } 
      await wishlist.save();
    } else {
      await Wishlist.create({
        userId: userId,
        products: [{ productId, favorite: true }],
      });
    }

    revalidatePath("/");
    revalidatePath("/cart");
  } catch (err) {
    console.log("Error Moving item to WishList", err);
  }
};

export const updatePrice = async (userId, productId, price_selected) => {
  console.log(userId, productId, price_selected);
  try {
    await connectToDB();

    const userprice = await UserPricing.findOne({ userId });

    if (!userprice) {
      await UserPricing.create({
        userId,
        usePrice: [
          {
            productId: productId,
            price_selected: price_selected,
          },
        ],
      });
    } else {
      const productIndex = userprice.usePrice.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        userprice.usePrice[productIndex].price_selected = price_selected;
      } else {
        userprice.usePrice.push({ productId: productId, price_selected });
      }

      await userprice.save();
    }
  } catch (err) {
    console.log("Error Updating Price", err);
  }
};

export const getUserSelectedPrice = async (userId, productId) => {
  try {
    const userPriceDoc = await UserPricing.findOne({ userId });
    if (!userPriceDoc) return null;
    const item = userPriceDoc.usePrice.find((p) => p.productId === productId);
    return item?.price_selected || null;
  } catch (err) {
    console.error("Error fetching selected price", err);
    return null;
  }
};
