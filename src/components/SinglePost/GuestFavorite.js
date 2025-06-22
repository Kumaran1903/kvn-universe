"use client";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function GuestFavorite({ post }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const addOrDeleteWishlist = () => {
    const productId = post.id;
    const existingWishlist = JSON.parse(
      localStorage.getItem("guest_wishlist") || "[]"
    );

    if (!existingWishlist.includes(productId)) {
      existingWishlist.push(productId);
      localStorage.setItem("guest_wishlist", JSON.stringify(existingWishlist));
      setIsFavorite(true);
    } else {
      const updatedWishlist = existingWishlist.filter((id) => id !== productId);
      localStorage.setItem("guest_wishlist", JSON.stringify(updatedWishlist));
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("guest_wishlist") || "[]"
    );
    setIsFavorite(existingWishlist.includes(post.id));
  }, [post.id]);

  return (
    <button
      onClick={addOrDeleteWishlist}
      className="absolute top-10 left-1 z-10 w-8 h-8 group transition-transform duration-200 hover:scale-110"
      style={{ padding: "6px" }}
    >
      <Heart
        className={`w-6 h-6 ${
          isFavorite
            ? "fill-indigo-400 stroke-indigo-400"
            : "fill-none stroke-gray-500"
        } transition-all duration-300 cursor-pointer`}
      />
    </button>
  );
}
