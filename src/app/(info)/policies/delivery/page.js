export default function DeliveryPolicy() {
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
          Digital Delivery Policy
        </h1>
        <p className="mb-4 text-sm text-gray-500">Effective Date: 13/06/2025</p>

        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
          1. Delivery Method
        </h2>
        <p>
          All edited videos or digital services will be delivered via email or a
          secure download link sent to your registered email address.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          2. Delivery Timeline
        </h2>
        <p>
          We strive to deliver the final output within <strong>8 hours</strong>{" "}
          of successful payment and submission of required materials. In case of
          technical issues, unexpected delays, or complex requirements, delivery
          may take up to <strong>2–3 business days</strong>.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          3. Contact
        </h2>
        <p>
          If you face delays or have questions about delivery, contact us at{" "}
          <strong>delivery@kevinmj534@gmail.com</strong>.
          <br />
        </p>
      </div>
    </div>
  );
}
