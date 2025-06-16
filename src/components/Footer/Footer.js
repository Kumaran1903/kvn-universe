import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      className=" bg-slate-200 text-gray-600"
      style={{ padding: "20px 0px" }}
    >
      <div
        className="container mx-auto flex flex-col space-y-5 md:flex-row justify-around w-4/5 "
        style={{ padding: "30px 0px" }}
      >
        <div className="flex flex-col space-y-4">
          <div className="text-lg text-gray-800 font-bold">Logo</div>
          <div>Address</div>
          <div>prashanthkevin@gmail.com</div>
          <div>+91987654321</div>
          <div className="md:flex space-x-3 hidden">
            <Link
              href="https://www.youtube.com" // <-- Replace with your actual channel
              target="_blank"
              className="h-8 w-8 ring-2 flex items-center justify-center rounded-full overflow-hidden cursor-pointer bg-gray-600 transition-all duration-300 ease-in-out hover:ring-violet-400 hover:bg-violet-400"
            >
              <Image
                src="/ytt.png"
                height={25}
                width={25}
                alt="YouTube"
                className="object-contain"
              />
            </Link>

            <Link
              href="/"
              target="_blank"
              className="h-8 w-8 ring-2 flex items-center justify-center rounded-full overflow-hidden cursor-pointer  bg-gray-600 hover:ring-violet-400 hover:bg-violet-400"
            >
              <Image
                src="/twit.png"
                height={25}
                width={25}
                alt="yt"
                className=" object-contain"
              />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="h-8 w-8 ring-2 flex items-center justify-center rounded-full overflow-hidden cursor-pointer  bg-gray-600 hover:ring-violet-400 hover:bg-violet-400"
            >
              <Image
                src="/insta.png"
                height={25}
                width={25}
                alt="yt"
                className=" object-contain"
              />
            </Link>
          </div>
          <span className="text-md font-semibold mt-3">
            Copyright &copy; 2025
          </span>
        </div>
        <div className="hidden lg:flex flex-col space-y-4">
          <h3 className="text-lg text-gray-800 font-bold">Quick Links</h3>
          <Link href="/">Store</Link>
          <Link href="/">Wishlist</Link>
          <Link href="/">Account</Link>
        </div>
        <div className="hidden lg:flex flex-col space-y-4">
          <h3 className="text-lg text-gray-800 font-bold">Important Links</h3>
          <Link href="/">AboutUs</Link>
          <Link href="/">ContactUs</Link>
          <Link href="/">Privacy Policy</Link>
        </div>
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg text-gray-800 font-bold">SUBSCRIBE</h3>
          <p>Be the first to get the latest offers</p>
          <form>
            <input
              type="text"
              placeholder="Email address"
              className=" bg-white h-12 rounded-l-md text-gray-600"
              style={{ padding: "5px 8px" }}
            />
            <button
              type="submit"
              className="bg-indigo-400 h-12 w-15 text-white rounded-r-md"
              style={{ padding: "10px" }}
            >
              JOIN
            </button>
          </form>
          <div className="relative h-15 w-44">
            <Image
              src="/payments.png"
              fill
              alt="/payments"
              className="object-contain"
            />
          </div>
          <div className="md:hidden flex justify-between mt-3">
            <span className="text-sm md:text-md font-semibold">
              Copyright &copy; 2025
            </span>
            <span className="text-sm md:text-md font-semibold">
              All rights Reserved.
            </span>
          </div>
          <span className="hidden md:block mt-3 text-right text-sm md:text-md font-semibold">
            All rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
