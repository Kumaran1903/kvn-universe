import Image from "next/image";
import Link from "next/link";
import "./globals.css"; // Make sure this is imported

export default function Home() {
  return (
    <div>
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="fixed top-0 left-0 w-full h-full " />

      {/* Hero Section */}
      <div className="h-[50vh] lg:h-[90vh] w-full">
        <div className="container mx-auto w-4/5 h-full flex items-center mt-10 lg:mt-0">
          <div className="flex flex-col items-center justify-center w-full space-y-3 text-center">
            <span className="font-bold text-white text-lg lg:text-4xl">
              UNLEASH YOUR CREATIVITY WITH KEVIN UNIVERSE
            </span>
            <span className="text-white text-lg">
              It&apos;s Time to Start Something New and Trust The Magic Of New
              Beginnings.
            </span>
            <span className="text-white/80">
              Personalized intros and title sequences in the style of your
              most-loved movies and shows
            </span>
            <span className="text-white/70">
              Perfect for your social media, special events, short films, or
              just for fun.
            </span>
          </div>
        </div>
      </div>

      {/* Social Media Scrolling Section */}
      <div className="mx-auto w-full py-5">
        <div className="container mx-auto w-3/4 overflow-hidden">
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

      {/* Popular Opening Intro Section */}
      <div className="w-full my-20">
        <div className="container mx-auto w-6/7 h-auto">
          <h3 className="text-center text-white text-2xl md:text-4xl font-bold mb-20">
            Popular Opening Intros
          </h3>

          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center space-y-16 md:space-y-0 md:space-x-16">
            {/* Card 1 */}
            <div className="flex flex-col justify-center items-center space-y-2 mb-20">
              <div className="relative h-40 w-72 md:h-56 md:w-96 mb-5 group">
                <Image
                  src="/intro1.png"
                  fill
                  sizes="100%"
                  alt="Intro 1"
                  className="object-contain rounded-md transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <span className="text-xl md:text-2xl font-semibold text-white">
                Kalki 2898 AD
              </span>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-center items-center space-y-2 mb-20">
              <div className="relative h-40 w-72 md:h-56 md:w-96 mb-5 group">
                <Image
                  src="/intro2.png"
                  fill
                  sizes="100%"
                  alt="Intro 2"
                  className="object-contain rounded-md transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <span className="text-xl md:text-2xl font-semibold text-white">
                Rise Roar Revolt
              </span>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-center items-center space-y-2 mb-20">
              <div className="relative h-40 w-72 md:h-56 md:w-96 mb-5 group">
                <Image
                  src="/intro3.png"
                  fill
                  sizes="100%"
                  alt="Intro 3"
                  className="object-contain rounded-md transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <span className="text-xl md:text-2xl font-semibold text-white">
                Good Bad Ugly
              </span>
            </div>
          </div>
          <p className="text-white/80 text-md text-center mt-4">
            Crafted on cutting-edge Digital Ocean servers, our intros represent a
            fusion of innovation and deliver unmatched quality.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full h-[75vh] flex flex-col md:flex-row items-center justify-center ">
        <div className="relative h-full w-full md:w-1/2 m-1">
          <Image
            src="/polygon-collage.png"
            fill
            alt="collage"
            sizes="100%"
            className="object-contain"
          />
        </div>
        <div className="w-3/4 md:w-1/2 md:mx-10 flex flex-col space-y-3 items-start sm:items-center md:items-start">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Check Out our Complete Intro Catalogue!
          </h2>
          <p className="text-white/80">
            A hub of unique intros and openings for studios, movies, and shows,
            crafted with expertise in After Effects, Premiere Pro,Photoshop, Cinema 4D, and
            Element 3D. Discover our diverse and dynamic collection for your
            next video.
          </p>
          <div className=" z-5">
            <Link
              href="https://www.youtube.com/@KVNUNIVERSE"
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
