"use client";
import dynamic from "next/dynamic";
const CheckoutButton = dynamic(() => import("./CheckoutButton"), {
  ssr: false,
});

export default function CheckoutButtonWrapper() {
  return (
    <div>
      <CheckoutButton />
    </div>
  );
}
