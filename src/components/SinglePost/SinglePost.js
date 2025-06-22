import { IndianRupee } from "lucide-react";
import Image from "next/image";
import CartButton from "./GuestCartButton";
import UserFavorite from "./UserFavorite";
import GuestFavorite from "./GuestFavorite";
import UserCartButton from "./UserCartButton";
import GuestCartButton from "./GuestCartButton";
export default function SinglePost({ post }) {
  const session = { user: { userId: "234" } }; // Placeholder for session data, replace with actual session logic
  return (
    <div className="shadow-indigo-100 shadow-xl w-80 sm:w-64 md:w-80 lg:w-72 xl:w-90  hover:shadow-2xl hover:shadow-indigo-200 my-7 mx-7 transition-shadow duration-300 rounded-b-xl group">
      <div
        className="w-full container mx-auto h-64 lg:h-72 flex flex-col items-center overflow-hidden "
        style={{ paddingBottom: "20px" }}
      >
        <div className="relative w-full h-full group  ">
          {session?.user ? (
            <UserFavorite post={post} userId={session.user.userId} />
          ) : (
            <GuestFavorite post={post} />
          )}
          <Image
            src="/img1.png"
            fill
            alt=""
            className="transition-transform duration-500 ease-in-out group-hover:scale-110 "
          />
        </div>
        <div
          className="w-full flex justify-between items-center"
          style={{ padding: " 10px 10px" }}
        >
          <div className="flex flex-col space-y-1 ">
            <span className="text-[1rem]">{post?.title}</span>
            <div
              className="flex items-center "
              style={{ padding: " 0px 10px" }}
            >
              <IndianRupee className="w-4 h-4 text-gray-600 font-bold" />
              <span className="text-gray-600 font-bold ">{post?.cost}</span>
            </div>
          </div>
          <span>
            {session?.user ? (
              <UserCartButton post={post} userId={session.user.userId} />
            ) : (
              <GuestCartButton post={post} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
