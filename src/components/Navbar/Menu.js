"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Store", url: "/store" },
    { name: "Wishlist", url: "/cart" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="ml-2">
      <div
        className="relative h-6 w-6 md:hidden z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image src="/menu.png" fill alt="menu" className="object-contain " />
      </div>
      {isOpen && (
        <div className="fixed inset-0 h-[50vh] z-20 md:hidden bg-white/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-10 font-semibold text-gray-800 uppercase md:text-sm lg:text-md">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className="hover:text-gray-500 "
              onClick={() => setIsOpen(!open)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
