"use client";
import { ShoppingCart } from "lucide-react";

export default function GuestCartButton({ post }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const productId = post.id;
    const existingCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
    const price_selected =
      localStorage.getItem("price_selected_" + productId) || "personal";

    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex === -1) {
      // Add new item
      existingCart.push({ productId, price_selected });
    } else {
      // Update existing item's price
      existingCart[existingItemIndex].price_selected = price_selected;
    }

    localStorage.setItem("guest_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="title" value={post.title} />
      <button
        type="submit"
        className="cursor-pointer bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl transition-all duration-300 transform active:scale-95 group"
        style={{ padding: "8px" }}
      >
        <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
      </button>
    </form>
  );
}
