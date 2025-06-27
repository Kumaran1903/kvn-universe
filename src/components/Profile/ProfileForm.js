"use client";
import React from "react";

export default function ProfileForm({ profile, setProfile }) {
  const isProfileComplete =
    profile.name?.trim() &&
    profile.email?.trim() &&
    profile.phone?.toString().trim().length >= 10;

  return (
    <div
      className="bg-white rounded-2xl shadow-lg border border-purple-100"
      style={{ padding: "32px" }}
    >
      <div className="flex items-center" style={{ marginBottom: "32px" }}>
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div style={{ marginLeft: "16px" }}>
          <h2 className="text-2xl font-bold text-gray-900">
            Profile Information
          </h2>
          <p className="text-gray-600">Tell us about yourself</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Name - Required */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700"
            style={{ marginBottom: "8px" }}
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            style={{ padding: "14px 16px" }}
          />
        </div>

        {/* Email - Required */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700"
            style={{ marginBottom: "8px" }}
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="your.email@example.com"
            className="w-full border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            style={{ padding: "14px 16px" }}
          />
        </div>

        {/* Phone - Required */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700"
            style={{ marginBottom: "8px" }}
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            placeholder="+91 9876543210"
            className="w-full border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            style={{ padding: "14px 16px" }}
          />
        </div>

        {/* City - Optional */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700"
            style={{ marginBottom: "8px" }}
          >
            City <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            value={profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            placeholder="Mumbai, Delhi, Bangalore..."
            className="w-full border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            style={{ padding: "14px 16px" }}
          />
        </div>

        {/* Instagram ID - Optional */}
        <div>
          <label
            className="block text-sm font-semibold text-gray-700"
            style={{ marginBottom: "8px" }}
          >
            Instagram ID <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            value={profile.instaId}
            onChange={(e) =>
              setProfile({ ...profile, instaId: e.target.value })
            }
            placeholder="@yourusername"
            className="w-full border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            style={{ padding: "14px 16px" }}
          />
        </div>

        {/* Profile Status */}
        <div
          className={`rounded-xl ${
            isProfileComplete
              ? "bg-green-50 border border-green-200"
              : "bg-orange-50 border border-orange-200"
          }`}
          style={{ padding: "16px" }}
        >
          <div className="flex items-center">
            {isProfileComplete ? (
              <svg
                className="w-5 h-5 text-green-500"
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
            ) : (
              <svg
                className="w-5 h-5 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            )}
            <span
              className={`text-sm font-medium ${
                isProfileComplete ? "text-green-700" : "text-orange-700"
              }`}
              style={{ marginLeft: "8px" }}
            >
              {isProfileComplete
                ? "Profile Complete"
                : "Please fill required fields"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
