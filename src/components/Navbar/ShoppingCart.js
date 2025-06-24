"use client";
import { getCartItems } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShoppingCart({ session }) {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      if (session?.user) {
        const cartItems = await getCartItems(session.user.userId);
        setCartItemCount(cartItems.length);
      } else {
        const guestCart = JSON.parse(
          localStorage.getItem("guest_cart") || "[]"
        );
        setCartItemCount(guestCart.length);
      }
    };

    fetchCart();
    window.addEventListener("cart-updated", fetchCart);
    return () => window.removeEventListener("cart-updated", fetchCart);
  }, [session]); 

  return (
    <Link href="/cart" className="relative h-10 w-6">
      <Image
        src="/shopping_cart.png"
        alt="Cart"
        fill
        className="object-contain cursor-pointer"
      />
      <span className="absolute -top-4 -right-5 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {cartItemCount}
      </span>
    </Link>
  );
}
