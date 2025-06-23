"use client";
import dynamic from "next/dynamic";
const GuestCartButton = dynamic(() => import("./GuestCartButton"), {
  ssr: false,
});
export default function GuestCartButtonWrapper({ post }) {
  return (
    <div>
      <GuestCartButton post={post} />
    </div>
  );
}
