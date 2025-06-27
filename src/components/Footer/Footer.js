import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      className=" bg-white/70 backdrop-blur-lg text-gray-600"
      style={{ padding: "20px 0px" }}
    >
      <div
        className="container mx-auto flex flex-col space-y-5 sm:flex-row justify-around w-4/5 "
        style={{ padding: "30px 0px" }}
      >
        <div className="flex flex-col space-y-4">
          <div className="text-lg text-gray-800 font-bold">Kevin Universe</div>
          <div>Address</div>
          <div>Bangalore -76 Karnataka</div>
          <div>kevinmj534@gmail.com</div>
          <div className="sm:flex space-x-3 hidden">
            <Link
              href="https://www.youtube.com/@KVNUNIVERSE"
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
              // target="_blank"
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
              href="https://www.instagram.com/kevin_universe_534?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
        <div className="hidden sm:flex flex-col space-y-4">
          <h3 className="text-lg text-gray-800 font-bold">Quick Links</h3>
          <Link href="/store">Store</Link>
          <Link href="/store">Wishlist</Link>
          <Link href="/checkout">Account</Link>
        </div>
        <div className="hidden sm:flex flex-col space-y-4">
          <h3 className="text-lg text-gray-800 font-bold">Important Links</h3>
          <Link href="/about">AboutUs</Link>
          <Link href="/contact">ContactUs</Link>
          <Link href="/policies/privacy-policy">Privacy Policy</Link>

          <span className="hidden sm:block mt-14  lg:mt-13 text-right text-sm md:text-md font-semibold">
            All rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
