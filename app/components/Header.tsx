"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.ok) {
        console.log("Logged out from backend");
      } else {
        console.warn("Backend logout failed, status:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("authToken");
    setAuthToken(null);
    router.push("/login");
  };

  return (
    <header className="w-full px-4 py-3 bg-gray-900 rounded-3xl shadow-md border-2 border-violet-950 mt-4 mx-auto max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Image src="/logo.png" alt="Sudoku Logo" width={40} height={40} />
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-500">
            Sudoku
          </h1>
        </div>

        {/* Nav Section */}
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-violet-600 hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950 w-full sm:w-auto text-center"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-violet-600 hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950 w-full sm:w-auto text-center"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-violet-600 hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950 w-full sm:w-auto text-center"
          >
            Register
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-800 hover:shadow-[0px_0px_6px_3px_rgb(255,150,150)] transition-colors border-2 border-red-800 w-full sm:w-auto text-center"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
