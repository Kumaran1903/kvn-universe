import { addToCart } from "@/lib/data";
import { ShoppingCart } from "lucide-react";

export default function UserCartButton({ post, userId }) {
  return (
    <form action={addToCart}>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="productId" value={post.id} />
      <button
        type="submit"
        className="cursor-pointer bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl transition-all duration-300 transform active:scale-95 group"
        style={{ padding: "8px" }}
      >
        <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
      </button>
    </form>
  );
}
