export default function ShippingPolicy() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800"
      style={{ padding: "40px 24px" }}
    >
      <div
        className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl"
        style={{ padding: "32px" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">
          Shipping & Delivery Policy
        </h1>
        <p className="mb-4 text-sm text-gray-500">Effective Date: 13/06/2025</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            1. Delivery Time
          </h2>
          <p>
            Orders are typically shipped within 2–3 business days and delivered
            within 5–7 business days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            2. Shipping Charges
          </h2>
          <p>
            Free shipping on orders above ₹999. A flat ₹50 is charged otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            3. Contact
          </h2>
          <p>
            For shipping inquiries, email us at{" "}
            <strong>shipping@prashanthkevin@gmail.com</strong>.
            <br />
          </p>
        </section>
      </div>
    </div>
  );
}
