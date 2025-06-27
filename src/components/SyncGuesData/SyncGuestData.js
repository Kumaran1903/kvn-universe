"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SyncGuestData({ userId }) {
  const router = useRouter();

  useEffect(() => {
    const guestCart = JSON.parse(
      localStorage.getItem("guest_cart") || "[]"
    ).map((item) => item.productId);
    const guestWishlist = JSON.parse(
      localStorage.getItem("guest_wishlist") || "[]"
    ).map((item) => item.productId);

    const guestPriceSelections = Object.entries(localStorage)
      .filter(
        ([key, value]) =>
          key.startsWith("price_selected_") &&
          (value === "personal" || value === "commercial")
      )
      .map(([key, value]) => ({
        productId: key.replace("price_selected_", ""),
        price_selected: value,
      }));
    console.log("useId:", userId);
    console.log("guestcart", guestCart);
    console.log("guestwishlist", guestWishlist);
    console.log("guestpriceselection", guestPriceSelections);

    if (
      guestCart.length > 0 ||
      guestWishlist.length > 0 ||
      guestPriceSelections.length > 0
    ) {
      fetch("/api/sync-guest-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          guestCart,
          guestWishlist,
          guestPriceSelections,
        }),
      }).then(() => {
        localStorage.removeItem("guest_cart");
        localStorage.removeItem("guest_wishlist");
        guestPriceSelections.forEach(({ productId }) =>
          localStorage.removeItem(`price_selected_${productId}`)
        );
        router.refresh();
      });
    }
  }, [router, userId]);

  return null;
}
