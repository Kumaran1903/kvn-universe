"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/lib/action";

export default function Menu({ session }) {
  const links = [
    { name: "Home", url: "/" },
    { name: "Store", url: "/store" },
    { name: "Wishlist", url: "/cart" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/login")) {
      localStorage.setItem("redirectAfterLogin", pathname);
    }
  }, [pathname]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    handleLogout();
  };
  return (
    <div className="ml-2">
      <div
        className="relative h-6 w-6 md:hidden z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src="/menu.png"
          fill
          sizes="100%"
          alt="menu"
          className="object-contain "
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 h-[55vh] z-20 md:hidden bg-white/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-10 font-semibold text-gray-800 uppercase md:text-sm lg:text-md">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.url}
              className="hover:text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {session?.user ? (
            // <form action={handleLogout}>
            <button
              onClick={handleClick}
              type="submit"
              className="relative cursor-pointer uppercase text-gray-600"
            >
              Logout
            </button>
          ) : (
            // </form>
            <Link href="/login" onClick={() => setIsOpen((prev) => !prev)}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
