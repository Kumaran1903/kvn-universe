"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [callbackUrl, setCallbackUrl] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const from = localStorage.getItem("redirectAfterLogin");
    if (from) {
      setCallbackUrl(from);
      localStorage.removeItem("redirectAfterLogin");
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const res = await signIn("google", {
      callbackUrl,
      redirect: false,
    });

    if (res?.ok && res.url) {
      router.push(res.url);
    } else {
      setIsLoading(false);
      alert("Sign-in failed. Try again.");
    }
  };

  return (
    <div
      className="min-h-[85vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
      style={{ padding: "16px" }}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
        style={{ padding: "32px" }}
      >
        <div className="text-center mb-8" style={{ marginBottom: "32px" }}>
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ marginBottom: "8px" }}
          >
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to your account</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center gap-2">
            <svg
              className="w-6 h-6 animate-spin text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <p className="text-blue-600 font-medium">Signing you in...</p>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-lg text-gray-700 font-medium hover:border-gray-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{ padding: "12px 24px" }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        )}

        <div className="text-center" style={{ marginTop: "24px" }}>
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <Link
              href="/policies/terms"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/policies/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
