"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.error(data.message || "Login failed.");
      alert(data.message || "Login failed.");
      return;
    }

    const data = await res.json();
    localStorage.setItem("authToken", data.authToken);

    router.push("/");
  } catch (err) {
    console.error("Something went wrong: ", err);
    alert("An error occurred. Please try again.");
  }
};


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-violet-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-violet-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-800 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-white mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-violet-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
