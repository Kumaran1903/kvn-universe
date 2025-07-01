"use client";
import dynamic from "next/dynamic";

const CheckoutClient = dynamic(() => import("./CheckoutClient"), {
  ssr: false,
});

export default function CheckoutClientWrapper({
  session,
  totalAmount,
  cartItems,
}) {
  return (
    <CheckoutClient
      session={session}
      totalAmount={totalAmount}
      cartItems={cartItems}
    />
  );
}
