"use client";
import { getGuestWishListItems } from "@/lib/storage";
import { Heart, IndianRupee, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GuestWishlist({ reloadFlag, triggerReload }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      const items = JSON.parse(localStorage.getItem("guest_wishlist") || "[]");
      if (items.length === 0) {
        setWishlistItems([]);
        return;
      }
      const data = await getGuestWishListItems(items);
      setWishlistItems(data);
    };
    fetchWishlist();
  }, [reloadFlag]);

  const removeFromWishList = (productId) => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("guest_wishlist") || "[]"
    );
    const updatedWishlist = existingWishlist.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem("guest_wishlist", JSON.stringify(updatedWishlist));
    triggerReload();
  };

  const removeFromWishListAddToCart = (productId) => {
    //removed from wishlist
    const existingWishlist = JSON.parse(
      localStorage.getItem("guest_wishlist") || "[]"
    );
    const updatedWishlist = existingWishlist.filter(
      (item) => item.productId !== productId
    );
    localStorage.setItem("guest_wishlist", JSON.stringify(updatedWishlist));
    //add to cart
    const existingCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === productId
    );
    const price_selected =
      localStorage.getItem("price_selected_" + productId) || "personal";

    if (existingItemIndex === -1) {
      existingCart.push({ productId, price_selected });
    } else {
      existingCart[existingItemIndex].price_selected = price_selected;
    }
    localStorage.setItem("guest_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cart-updated"));
    triggerReload();
  };

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 rounded-2xl shadow-xl overflow-hidden">
      <div
        className="sticky top-0 bg-white/90 backdrop:blur-sm border-b border-indigo-100 z-5"
        style={{ padding: "24px" }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 rounded-xl" style={{ padding: "8px" }}>
            <Heart className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              My WishList
            </h2>
            <p className="text-gray-600">
              {wishlistItems.length}
              {wishlistItems.length <= 1 ? " item " : " items "} saved
            </p>
          </div>
        </div>
      </div>

      <div className="h-full overflow-y-auto" style={{ paddingBottom: "96px" }}>
        <div className="space-y-4" style={{ padding: "24px" }}>
          {wishlistItems.length === 0 ? (
            <div className="text-center" style={{ padding: "64px 0" }}>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your wishlist is empty</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ padding: "12px" }}
              >
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block h-20 w-28 relative overflow-hidden">
                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      className="object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm sm:text-md font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </div>
                    <p className="flex items-center text-gray-600 font-bold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{item.price_selected}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => removeFromWishListAddToCart(item.id)}
                      className="bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
                      style={{ padding: "8px" }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFromWishList(item.id)}
                      className="bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                      style={{ padding: "8px" }}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
