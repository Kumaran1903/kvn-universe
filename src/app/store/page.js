"use client";
import Image from "next/image";
import { useState } from "react";

export default function Store() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex flex-wrap container mx-auto items-center justify-center sm:justify-start start mb-40">
      <div className="shadow-indigo-100 shadow-xl w-80 sm:w-64 md:w-80 lg:w-72 xl:w-90  hover:shadow-2xl hover:shadow-indigo-200 my-5 mx-5 transition-shadow duration-300 rounded-b-xl group">
        <div
          className="w-full container mx-auto h-64 lg:h-72 flex flex-col items-center overflow-hidden "
          style={{ paddingBottom: "20px" }}
        >
          <div className="relative w-full h-full group cursor-pointer">
            <Image
              src="/img1.png"
              fill
              alt=""
              className="transition-transform duration-500 ease-in-out group-hover:scale-105 "
            />
          </div>
          <div
            className="w-full flex justify-between items-center"
            style={{ padding: " 10px 10px" }}
          >
            <div className="flex flex-col space-y-1 ">
              <span className="text-[1rem]">Universal 100th Anniversary</span>
              <span
                className="text-gray-600 font-bold "
                style={{ padding: " 0px 10px" }}
              >
                $12.99
              </span>
            </div>
            <div
              onClick={() => setLiked(!liked)}
              className="cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={liked ? "#818cf8" : "#4b5563"} // indigo-400 : gray-600
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
             4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
             3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 
             8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* ring-1 ring-gray-600 bg-gray-600 transition-all duration-300 ease-in-out hover:ring-indigo-400 hover:bg-indigo-400 */
}
