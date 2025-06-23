"use client";
import React, { useEffect, useState } from "react";
import ProfileForm from "@/components/Profile/ProfileForm";
import PaymentForm from "@/components/Payment/PaymentForm";

export default function CheckoutClient({ session, totalAmount }) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    instaId: "",
  });

  useEffect(() => {
    if (session?.user) {
      setProfile((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      }));
    }
  }, [session]);

  const isProfileComplete = profile.name && profile.email && profile.phone;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-24">
      <ProfileForm profile={profile} setProfile={setProfile} />
      <PaymentForm
        profile={profile}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        upiId={upiId}
        setUpiId={setUpiId}
        totalAmount={totalAmount}
      />
    </div>
  );
}
