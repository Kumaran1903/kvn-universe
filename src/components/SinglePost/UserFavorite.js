import { addOrDeleteWishlist } from "@/lib/data";
import { Heart } from "lucide-react";

export default function UserFavorite({ post, userId }) {
  return (
    <form action={addOrDeleteWishlist}>
      <input type="hidden" value={post.id} name="productId" />
      <input type="hidden" value={userId} name="userId" />
      <button
        type="submit"
        className="absolute top-10 left-1 z-10 w-8 h-8 group transition-transform duration-200 hover:scale-110"
        style={{ padding: "6px" }}
      >
        <Heart
          className={`w-6 h-6 ${
            post.favorite
              ? "fill-indigo-400 stroke-indigo-400"
              : "fill-none stroke-gray-500"
          } transition-all duration-300 cursor-pointer`}
        />
      </button>
    </form>
  );
}
