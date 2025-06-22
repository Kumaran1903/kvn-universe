import UserCart from "./UserCart";
import UserWishlist from "./UserWishlist";

export default function UserView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[95vh]">
      <UserWishlist />
      <UserCart />
    </div>
  );
}
