import { Cart, Wishlist, Post } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, guestCart = [], guestWishlist = [] } = await req.json();
    await connectToDB();

    // === SYNC CART ===
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const mergedCart = [...new Set([...cart.productIds, ...guestCart])];
      cart.productIds = mergedCart;
      await cart.save();
    } else {
      await Cart.create({ userId, productIds: [...new Set(guestCart)] });
    }

    // === SYNC WISHLIST ===
    const wishlist = await Wishlist.findOne({ userId });
    const mergedWishlist = wishlist
      ? [...new Set([...wishlist.productIds, ...guestWishlist])]
      : [...new Set(guestWishlist)];

    if (wishlist) {
      wishlist.productIds = mergedWishlist;
      await wishlist.save();
    } else {
      await Wishlist.create({ userId, productIds: mergedWishlist });
    }

    // === UPDATE POSTS (mark as favorite) ===
    for (const productId of guestWishlist) {
      await Post.findByIdAndUpdate(productId, {
        $set: { favorite: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error syncing guest data", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
