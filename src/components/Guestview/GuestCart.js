"use client";
import { getGuestCartItems } from "@/lib/storage";
import { Heart, IndianRupee, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CheckoutButton from "../Userview/CheckoutButton";

export default function GuestCart({ reloadFlag, triggerReload }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const items = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      if (items.length === 0) {
        setCartItems([]);
        return;
      }
      const data = await getGuestCartItems(items);
      setCartItems(data);
    };
    fetchCart();
  }, [reloadFlag]);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    const updatedIds = updatedCart.map((item) => item.id);
    localStorage.setItem("guest_cart", JSON.stringify(updatedIds));
    window.dispatchEvent(new Event("cart-updated"));
    triggerReload();
  };

  const addWishlistDeleteCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    const updatedIds = updatedCart.map((item) => item.id);
    localStorage.setItem("guest_cart", JSON.stringify(updatedIds));

    const wishlist = JSON.parse(localStorage.getItem("guest_wishlist") || "[]");
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem("guest_wishlist", JSON.stringify(wishlist));
    }
    window.dispatchEvent(new Event("cart-updated"));
    triggerReload();
  };

  const total = cartItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-slate-100 to-indigo-100 rounded-2xl shadow-xl overflow-hidden border-indigo-200">
      <div
        className="sticky top-0 bg-white/90 backdrop:blur-sm border-b border-indigo-200 z-5"
        style={{ padding: "24px" }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 rounded-xl" style={{ padding: "8px" }}>
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-800 font-semibold text-2xl">
              Shopping Cart
            </h2>
            <p className="text-gray-600">
              {cartItems.length}
              {cartItems.length <= 1 ? " item " : " items "} in cart
            </p>
          </div>
        </div>
      </div>

      <div
        className="h-full overflow-y-auto"
        style={{ paddingBottom: "228px" }}
      >
        <div className="space-y-4" style={{ padding: "24px" }}>
          {cartItems.length === 0 ? (
            <div className="text-center" style={{ padding: "64px 0" }}>
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ padding: "16px" }}
              >
                <div className="flex gap-3 items-center">
                  <div className="relative h-20 w-28 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="flex items-center text-gray-600 font-bold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{item.cost}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addWishlistDeleteCart(item.id)}
                      className="bg-indigo-100 hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-lg transition-all transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                      style={{ padding: "9px" }}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                      style={{ padding: "9px" }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div
          className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-indigo-200"
          style={{ padding: "24px" }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
              <span>Total Amount:</span>
              <div className="flex items-center">
                <IndianRupee className="w-6 h-6 text-indigo-600" />
                <span className="text-2xl text-indigo-600">{total}</span>
              </div>
            </div>
            <CheckoutButton userId={null} />
          </div>
        </div>
      )}
    </div>
  );
}
