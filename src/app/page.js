import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="h-[50vh] lg:h-screen bg-gradient-to-t w-full from-indigo-200 ">
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
        className=" mx-auto  w-full bg-gray-100 "
        style={{ padding: "10px 0" }}
      >
        <div className="container mx-auto w-3/4 overflow-hidden bg-gray-100 my-10">
          <div className="scroll-wrapper">
            <div className="scroll-content">
              {[...Array(2)].map((_, i) => (
                <div className="flex items-center space-x-40 px-8" key={i}>
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={120}
                    height={150}
                    className="grayscale"
                  />
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={120}
                    height={150}
                    className="grayscale"
                  />
                  <Image
                    src="/twitter.png"
                    alt="Twitter"
                    width={120}
                    height={150}
                    className="grayscale"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
