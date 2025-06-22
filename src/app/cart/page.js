// import { auth } from "@/auth"; // use later when ready

import GuestView from "@/components/Guestview/Guestview";
import UserView from "@/components/Userview/Userview";

const WishlistCartTemplate = async () => {
  const session = null; // replace with: await auth();

  return (
    <div className="mb-64 lg:mb-0">
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto" style={{ padding: "32px 16px" }}>
          {session?.user ? <UserView /> : <GuestView />}
        </div>
      </div>
    </div>
  );
};

export default WishlistCartTemplate;
