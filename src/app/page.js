import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="h-[50vh] lg:h-[90vh] w-full bg-gradient-to-t  from-indigo-200 ">
        <div className="container mx-auto w-4/5 h-full flex items-center mt-10 lg:mt-0">
          {/* Left Section */}
          <div className="w-3.2/7 h-full flex flex-col justify-center space-y-3 ">
            <span className="font-bold text-lg lg:text-xl">
              Hook Users from The Start
            </span>
            <span className="font-bold text-4xl lg:text-5xl">Get Yourself</span>
            <span
              className="font-bold text-3xl lg:text-5xl bg-black text-white block w-fit rounded-lg"
              style={{ padding: "15px" }}
            >
              Stunning Intros
            </span>
            <span className="text-sm xl:text-md  text-gray-700">
              Personalized intros in the style of your most-loved movies and
              shows.
            </span>
            <span className="text-sm xl:text-md text-gray-700">
              Perfect for your social media, special events, or just for fun.
            </span>
          </div>

          {/* Right Section */}
          <div className="w-4/7 h-full relative hidden md:block">
            <Image src="/temp.png" fill alt="temp" className="object-contain" />
          </div>
        </div>
      </div>
      {/* Social Media Scrolling Section */}
      <div
        className=" mx-auto  w-full bg-indigo-50 "
        style={{ padding: "20px" }}
      >
        <div className="container mx-auto w-3/4 overflow-hidden bg-indigo-50 ">
          <div className="scroll-wrapper">
            <div className="scroll-content">
              {[...Array(2)].map((_, i) => (
                <div className="flex items-center space-x-40 px-8" key={i}>
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={120}
                    height={150}
                  />
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={120}
                    height={150}
                  />
                  <Image
                    src="/twitter.png"
                    alt="Twitter"
                    width={120}
                    height={150}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Popular Opening Intro Section  */}
      <div className="w-full bg-indigo-100" style={{ padding: "75px 0px" }}>
        <div className="container mx-auto w-6/7 h-auto">
          <h3 className="text-center text-2xl md:text-4xl font-bold mb-20">
            Popular Opening Intros
          </h3>

          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center space-y-16 md:space-y-0 md:space-x-16">
            {/* Card 1 */}
            <div className="flex flex-col justify-center items-center space-y-2 mb-20  ">
              <div className="relative h-40 w-72 md:h-56 md:w-96 mb-5 group">
                <Image
                  src="/intro1.png"
                  fill
                  alt="Intro 1"
                  className="object-contain rounded-md transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <span className="text-lg text-gray-600">Marvel Studios</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">
                Craft Your Signature Intro
              </span>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-center items-center space-y-2 mb-10">
              <div className="relative h-40 w-72 md:h-56 md:w-96 mb-5 group">
                <Image
                  src="/intro2.png"
                  fill
                  alt="Intro 2"
                  className="object-contain rounded-md transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <span className="text-lg text-gray-600">Netflix</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">
                Sleek & Modern Design
              </span>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-center items-center space-y-2 mb-20">
              <div className="relative h-40 w-72 md:h-56 md:w-96 mb-5 group">
                <Image
                  src="/intro3.png"
                  fill
                  alt="Intro 3"
                  className="object-contain rounded-md transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <span className="text-lg text-gray-600">
                Guardians of the Galaxy
              </span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">
                Launch with a Bang
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-md text-center">
            Crafted on cutting-edge DigitalOcean servers, our intros represent a
            fusion of innovation and deliver unmatched quality.
          </p>
        </div>
      </div>
      {/*  */}
      <div className="w-full  h-[75vh] flex flex-col md:flex-row items-center justify-center bg-indigo-50 shadow-[0_-10px_20px_rgba(99,102,241,0.15),0_10px_20px_rgba(99,102,241,0.15)]">
        <div className="relative h-full w-full md:w-1/2 m-1">
          <Image src="/pentagon.png" fill alt="/" className="object-contain" />
        </div>
        <div className=" w-3/4 md:w-1/2  md:mx-10 flex flex-col space-y-3 items-start sm:items-center md:items-start ">
          <h2 className=" text-lg  font-bold">
            Check Out our Complete Intro Catalogue!
          </h2>
          <p className="text-gray-600 ">
            A hub of unique intros and openings for studios, movies, and shows,
            crafted with expertise in After Effects, Blender, Cinema 4D, and
            Element 3D. Discover our diverse and dynamic collection for your
            next video.
          </p>
          <div className="group">
            <Link
              href="https://youtube.com"
              target="_blank"
              className=" rounded-md flex items-center justify-center space-x-2 bg-black w-fit mb-7  transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ padding: "8px 12px" }}
            >
              <Image
                src="/yt.png"
                height={50}
                width={25}
                alt="youtube"
                className="object-contain "
              />
              <span className="text-white">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
