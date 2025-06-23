"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SyncGuestData({ userId }) {
  const router = useRouter();
  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
    const guestWishlist = JSON.parse(
      localStorage.getItem("guest_wishlist") || "[]"
    );

    if (guestCart.length || guestWishlist.length) {
      fetch("/api/sync-guest-data", {
        method: "POST",
        body: JSON.stringify({ userId, guestCart, guestWishlist }),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        localStorage.removeItem("guest_cart");
        localStorage.removeItem("guest_wishlist");
      });
    }
    router.refresh();
  }, []);

  return null; // No UI
}
