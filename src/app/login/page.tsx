"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  const { loading, login, requireGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      requireGuest("/users");
    }
  }, [loading, requireGuest]);

  const handleLogin = async (email: string, password: string) => {
    const toastId = toast.loading("Logging in...");
    try {
      console.time("login-request");
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.timeEnd("login-request");
      if (response.ok) {
        login(data.token, data.user);
        toast.success("Login successful!", { id: toastId });
        router.push("/users");
      } else {
        toast.error(data.message || "An error occurred.", { id: toastId });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error occurred.", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <LoginForm onLogin={handleLogin} loading={loading} />
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Demo Credentials:</strong> Use any seeded user email with
            password: <code>User123@</code>
          </p>
        </div>
      </div>
    </div>
  );
}
