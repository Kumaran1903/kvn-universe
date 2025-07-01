"use client";
import React, { useEffect, useState } from "react";
import ProfileForm from "@/components/Profile/ProfileForm";
import PaymentForm from "@/components/Payment/PaymentForm";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function CheckoutClient({ session, totalAmount, cartItems }) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    instaId: "",
  });

  const debouncedProfile = useDebounce(profile, 1000);

  // Fetch user data from DB
  useEffect(() => {
    if (session?.user?.userId) {
      fetch("/api/get-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setProfile({
              _id: data.user._id,
              name: data.user.name || "",
              email: data.user.email || "",
              phone: data.user.phone || "",
              city: data.user.city || "",
              instaId: data.user.instaId || "",
            });
          }
        })
        .catch((err) => console.error("Error loading profile", err));
    }
  }, [session]);

  // Auto-save to DB
  useEffect(() => {
    const isProfileComplete =
      debouncedProfile.name && debouncedProfile.email && debouncedProfile.phone;

    if (!isProfileComplete || !debouncedProfile._id) return;

    fetch("/api/save-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(debouncedProfile),
    }).catch((err) => console.error("Failed to save profile:", err));
  }, [debouncedProfile]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      style={{ paddingBottom: "40px" }}
    >
      <ProfileForm profile={profile} setProfile={setProfile} />
      <PaymentForm
        cartItems={cartItems}
        profile={profile}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        upiId={upiId}
        setUpiId={setUpiId}
        totalAmount={totalAmount}
        userId={session?.user?.userId}
      />
    </div>
  );
}
