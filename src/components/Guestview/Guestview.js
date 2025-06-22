"use client";

import GuestCart from "./GuestCart";
import GuestWishlist from "./GuestWishlist";
import { useState } from "react";

export default function GuestView() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const triggerReload = () => {
    setReloadFlag((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[95vh]">
      <GuestWishlist reloadFlag={reloadFlag} triggerReload={triggerReload} />
      <GuestCart reloadFlag={reloadFlag} triggerReload={triggerReload} />
    </div>
  );
}
