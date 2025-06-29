"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeviceType } from "@/lib/hooks/useDeviceType";

export default function PaymentForm({
  profile,
  paymentMethod,
  setPaymentMethod,
  upiId,
  setUpiId,
  totalAmount,
  userId,
}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const isProfileComplete =
    profile.name?.trim() &&
    profile.email?.trim() &&
    profile.phone?.toString().trim().length >= 10;

  const deviceType = useDeviceType();

  const router = useRouter();

  const handleFileUpload = async (file) => {
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
      setIsOrderPlaced(true);

      const formData = new FormData();
      formData.append("userId", userId); // or use userId directly if passed
      formData.append("file", file);
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);

      try {
        const res = await fetch("/api/send-payment-proof", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();

        if (result.success) {
          setTimeout(() => {
            router.push("/store");
          }, 3000);
        } else {
          alert("Failed to send email or clear cart.");
        }
      } catch (err) {
        console.error("Upload Error:", err);
        alert("Something went wrong!");
      }
    } else {
      alert("Please upload a valid image file (JPG/PNG).");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg border border-blue-100 "
      style={{ padding: "32px" }}
    >
      <div className="flex items-center" style={{ marginBottom: "32px" }}>
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div style={{ marginLeft: "16px" }}>
          <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
          <p className="text-gray-600">Choose your payment method</p>
        </div>
      </div>

      <div
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
        style={{ padding: "24px", marginBottom: "32px" }}
      >
        <h3
          className="text-lg font-bold text-gray-900"
          style={{ marginBottom: "16px" }}
        >
          Order Summary
        </h3>
        <div
          className="flex justify-between items-center"
          style={{ marginBottom: "12px" }}
        >
          <span className="text-gray-600">Cart Total:</span>
          <span className="font-semibold text-gray-900">₹{totalAmount}</span>
        </div>
        <div
          className="flex justify-between items-center"
          style={{ marginBottom: "12px" }}
        >
          <span className="text-gray-600">Processing Fee:</span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>
        <div
          className="border-t border-blue-200"
          style={{ paddingTop: "12px" }}
        >
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">
              Total Amount:
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ₹{totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method shown based on device */}
      {deviceType === "mobile" ? (
        <div
          className="border-2 border-purple-500 bg-purple-50 rounded-xl"
          style={{ padding: "16px", marginBottom: "32px" }}
        >
          <label
            className="font-medium text-gray-900 block"
            style={{ marginBottom: "8px" }}
          >
            Enter your UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="yourname@paytm"
            className="w-full border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            style={{ padding: "12px" }}
          />
        </div>
      ) : (
        isProfileComplete && (
          <>
            <div
              className="border-2 border-blue-500 bg-blue-50 rounded-xl"
              style={{ padding: "16px", marginBottom: "24px" }}
            >
              <div className="flex flex-col items-center">
                <Image
                  src="/qr.png"
                  alt="QR Code"
                  height={150}
                  width={250}
                  className="object-contain"
                />
                <p
                  className="text-sm font-medium text-gray-700"
                  style={{ marginTop: "8px" }}
                >
                  Scan to Pay ₹{totalAmount}
                </p>
              </div>
            </div>

            {/* File Upload Section */}
            {!isOrderPlaced ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                style={{ padding: "24px", marginBottom: "24px" }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="flex flex-col items-center text-center">
                  <svg
                    className={`w-12 h-12 mb-4 ${isDragOver ? "text-blue-500" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Payment Screenshot
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your payment screenshot here, or click to
                    browse
                  </p>
                  <label
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
                    style={{ padding: "12px 24px" }}
                  >
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p
                    className="text-xs text-gray-500"
                    style={{ marginTop: "8px" }}
                  >
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </div>
              </div>
            ) : (
              /* Order Confirmation */
              <div
                className="border-2 border-green-200 bg-green-50 rounded-xl"
                style={{ padding: "24px", marginBottom: "24px" }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Thank You for Placing Your Order!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Your payment screenshot has been uploaded successfully.
                  </p>
                  <div
                    className="bg-white rounded-lg border border-green-200"
                    style={{ padding: "16px" }}
                  >
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We will verify your payment and send you the download link
                      via email within 24 hours. Please check your inbox (and
                      spam folder) for the confirmation email.
                    </p>
                  </div>
                  {uploadedFile && (
                    <p
                      className="text-sm text-gray-600"
                      style={{ marginTop: "12px" }}
                    >
                      Uploaded: {uploadedFile.name}
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )
      )}

      {deviceType === "mobile" && (
        <button
          onClick={() => {
            if (!isProfileComplete) {
              return alert("Please fill required profile fields.");
            }
            if (!upiId) {
              return alert("Enter UPI ID");
            }

            const note = "Payment for Order";
            const upiLink = `upi://pay?pa=9916687534@ptaxis&pn=${profile.name}&am=${totalAmount}&tn=${note}&cu=INR`;

            window.open(upiLink, "_blank");
          }}
          disabled={!isProfileComplete}
          className={`w-full font-bold text-lg rounded-2xl transition-all transform hover:scale-105 ${
            isProfileComplete
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          style={{ padding: "18px", marginTop: "24px" }}
        >
          Pay ₹{totalAmount}
        </button>
      )}

      <div className="text-center" style={{ marginTop: "20px" }}>
        <div className="flex items-center justify-center">
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="text-sm text-gray-600" style={{ marginLeft: "8px" }}>
            Secured by 256-bit SSL encryption
          </span>
        </div>
      </div>
    </div>
  );
}
