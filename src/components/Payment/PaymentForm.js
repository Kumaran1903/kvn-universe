"use client";
import Image from "next/image";
import React from "react";
import { useDeviceType } from "@/lib/hooks/useDeviceType";

export default function PaymentForm({
  profile,
  paymentMethod,
  setPaymentMethod,
  upiId,
  setUpiId,
  totalAmount,
}) {
  const isProfileComplete =
    profile.name?.trim() &&
    profile.email?.trim() &&
    profile.phone?.toString().trim().length >= 10;

  const deviceType = useDeviceType();

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
        <div
          className="border-2 border-blue-500 bg-blue-50 rounded-xl"
          style={{ padding: "16px", marginBottom: "32px" }}
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
