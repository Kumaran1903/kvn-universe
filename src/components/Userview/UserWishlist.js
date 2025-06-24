import {
  removeFromWishListAddToCart,
  getWishListItems,
  removeFromWishlist,
} from "@/lib/data";
import { Heart, IndianRupee, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
export default async function UserWishlist({ userId }) {
  const wishlistItems = await getWishListItems(userId);
  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 rounded-2xl shadow-xl overflow-hidden">
      {/* head */}
      <div
        className="sticky top-0 bg-white/90 backdrop:blur-sm border-b border-indigo-100 z-5"
        style={{ padding: "24px" }}
      >
        <div className="flex items-center gap-3">
          {/* logo */}
          <div className="bg-indigo-100 rounded-xl" style={{ padding: "8px" }}>
            <Heart className="w-6 h-6 text-indigo-600" />
          </div>
          {/* heading */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              My WishList
            </h2>
            <p className="text-gray-600">
              {wishlistItems.length}
              {wishlistItems.length <= 1 ? " item " : " items "} saved
            </p>
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-auto" style={{ paddingBottom: "96px" }}>
        <div className="space-y-4" style={{ padding: "24px" }}>
          {wishlistItems.length === 0 ? (
            <div className="text-center" style={{ padding: "64px 0" }}>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your wishlist is empty</p>
            </div>
          ) : (
            wishlistItems.map((item, index) => (
              <div
                key={item.id}
                className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                style={{ padding: "12px" }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-28 relative overflow-hidden ">
                    <Image
                      src={item.image}
                      fill
                      alt={item.title}
                      className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="flex items-center text-gray-600 font-bold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{item.cost}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <form action={removeFromWishListAddToCart}>
                      <input type="hidden" value={userId} name="userId" />
                      <input type="hidden" value={item.id} name="productId" />
                      <button
                        type="submit"
                        className="bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
                        style={{ padding: "8px" }}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </form>
                    <form action={removeFromWishlist}>
                      <input type="hidden" value={userId} name="userId" />
                      <input type="hidden" value={item.id} name="productId" />
                      <button
                        className="bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                        style={{ padding: "8px" }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
