export default function TermsOfService() {
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
          Terms & Conditions
        </h1>
        <p className="mb-4 text-sm text-gray-500">Effective Date: 13/06/2025</p>

        <p className="mb-4">
          By using our platform, you agree to the following terms:
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
          1. Services
        </h2>
        <p>
          We provide professional digital services including video editing,
          motion graphics, and similar creative outputs.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          2. User Conduct
        </h2>
        <p>
          You agree not to submit inappropriate content or violate any
          applicable laws. You’re responsible for content you upload.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          3. Delivery
        </h2>
        <p>
          Edited digital content will be delivered via email or download link
          after successful payment, within the agreed timeline.
        </p>

        <h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-2">
          4. Contact
        </h2>
        <p>
          Reach out for queries at{" "}
          <strong>support@prashanthkevin@gmail.com</strong>
          <br />
        </p>
      </div>
    </div>
  );
}
