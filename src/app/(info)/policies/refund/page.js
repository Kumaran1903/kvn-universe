export default function RefundPolicy() {
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
          Cancellation & Refund Policy
        </h1>
        <p className="mb-4 text-sm text-gray-500">Effective Date: 13/06/2025</p>

        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
          1. Cancellations
        </h2>
        <p>
          Orders can be cancelled within 2 hours of payment. After we start
          working on the project, cancellation is not guaranteed.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          2. Refunds
        </h2>
        <p>
          Refunds are applicable only if no work has been initiated. Partial
          refunds may be offered based on work progress.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          3. Contact
        </h2>
        <p>
          Email us at <strong>refunds@kevinmj534@gmail.com</strong> for
          refund-related concerns.
          <br />
        </p>
      </div>
    </div>
  );
}
