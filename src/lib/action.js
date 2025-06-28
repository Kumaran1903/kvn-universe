"use server";

import { signIn, signOut } from "./auth";

export const handleLogin = async () => {
  signIn("google", { callbackUrl: window.location.href });
  console.log("Login successful");
};

export const handleLogout = async () => {
  await signOut();
};

