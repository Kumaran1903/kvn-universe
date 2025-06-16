"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Store", url: "/store" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "Login", url: "/login" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-10">
      <div className="relative container mx-auto w-4/5 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">Logo</div>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-10 font-semibold text-gray-600 uppercase md:text-sm lg:text-md">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className="relative text-gray-600 hover:text-indigo-600 transition-color duration-300 after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-indigo-600 after:transform after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative h-6 w-6 cursor-pointer">
            <Image
              src="/shopping_cart.png"
              alt="Cart"
              fill
              className="object-contain "
            />
          </div>

          <div
            className="relative h-6 w-6 md:hidden z-30"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              src="/menu.png"
              fill
              alt="menu"
              className="object-contain "
            />
          </div>
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
    </div>
  );
}
