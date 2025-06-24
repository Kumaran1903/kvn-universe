import { auth } from "@/lib/auth";
import UserCart from "./UserCart";
import UserWishlist from "./UserWishlist";
import SyncGuestData from "../SyncGuesData/SyncGuestData";

export default async function UserView() {
  const session = await auth();
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[95vh]">
        <UserWishlist userId={session?.user?.userId} />
        <UserCart userId={session?.user?.userId} />
      </div>
      <SyncGuestData userId={session?.user?.userId} />
    </div>
  );
}
