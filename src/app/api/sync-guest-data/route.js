import { Cart, Wishlist, UserPricing } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      userId,
      guestCart = [],
      guestWishlist = [],
      guestPriceSelections = [],
    } = await req.json();

    await connectToDB();

    // === SYNC CART ===
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const existingIds = new Set(cart.productIds);
      const newItems = guestCart.filter((id) => !existingIds.has(id));
      if (newItems.length > 0) {
        cart.productIds.push(...newItems);
        await cart.save();
      }
    } else {
      await Cart.create({ userId, productIds: [...new Set(guestCart)] });
    }

    // === SYNC WISHLIST ===
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      const existingIds = new Set(
        wishlist.products.map((item) => item.productId)
      );
      const newProducts = guestWishlist
        .filter((id) => !existingIds.has(id))
        .map((id) => ({ productId: id, favorite: true }));
      if (newProducts.length > 0) {
        wishlist.products.push(...newProducts);
        await wishlist.save();
      }
    } else {
      const products = guestWishlist.map((id) => ({
        productId: id,
        favorite: true,
      }));
      await Wishlist.create({ userId, products });
    }

    // === SYNC USER PRICING ===
    const userPricing = await UserPricing.findOne({ userId });
    if (userPricing) {
      const existingPairs = new Set(
        userPricing.usePrice.map((p) => `${p.productId}_${p.price_selected}`)
      );
      const newEntries = guestPriceSelections.filter(
        ({ productId, price_selected }) =>
          !existingPairs.has(`${productId}_${price_selected}`)
      );
      if (newEntries.length > 0) {
        userPricing.usePrice.push(...newEntries);
        await userPricing.save();
      }
    } else {
      await UserPricing.create({
        userId,
        usePrice: [...guestPriceSelections],
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error syncing guest data", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
