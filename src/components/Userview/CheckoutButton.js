"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function CheckoutButton( ) {
  useEffect(() => {
    const fromPage = window.location.pathname;
    localStorage.setItem("redirectAfterLogin", fromPage);
  }, []);
  return (
    <Link
      href="/checkout"
      className="cursor-pointer w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      style={{ padding: "16px 24px" }}
    >
      Proceed to Buy
    </Link>
  );
}
