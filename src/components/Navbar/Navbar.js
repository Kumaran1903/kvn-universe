import Link from "next/link";
import Menu from "./Menu";
import ShoppingCart from "./ShoppingCart";
import { auth } from "@/lib/auth";
import { handleLogout } from "@/lib/action";

export default async function Navbar() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Store", url: "/store" },
    { name: "Wishlist", url: "/cart" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  const session = await auth();
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-25">
      <div className="relative container mx-auto w-4/5 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">Kevin Universe</div>

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
          {session?.user ? (
            <form action={handleLogout}>
              <button
                type="submit"
                className="relative cursor-pointer uppercase text-gray-600 hover:text-indigo-600 transition-color duration-300 after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-indigo-600 after:transform after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
        <div className="flex items-center space-x-5">
          <ShoppingCart session={session} />
          <Menu session={session} />
        </div>
      </div>
    </div>
  );
}
