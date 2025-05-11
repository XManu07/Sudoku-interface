"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, password, confirmPassword });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-violet-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-800 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-white mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-300 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
