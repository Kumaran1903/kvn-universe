import { auth } from "@/lib/auth";
import CheckoutClientWrapper from "./CheckoutClientWrapper";
import { getCartItems } from "@/lib/data";

export default async function CheckoutPage() {
  const session = await auth();
  const cartItems = await getCartItems(session?.user?.userId);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Complete Your Order
          </h1>
          <p className="text-gray-600 mt-2">
            Fill your details and proceed to payment
          </p>
        </div>

        <CheckoutClientWrapper session={session} totalAmount={totalAmount} />
      </div>
    </div>
  );
}
