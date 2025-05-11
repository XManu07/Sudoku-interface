"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex flex-row justify-between items-center px-4 py-3 bg-gray-900 rounded-3xl shadow-md border-2 border-violet-950 mt-4 mx-auto max-w-6xl">
      <div className="flex items-center gap-5">
        <Image src="/logo.png" alt="Sudoku Logo" width={40} height={40} />
        <h1 className="text-3xl font-bold text-violet-500">Sudoku</h1>
      </div>

      <nav className="flex gap-4">
        <Link
          href="/game"
          className="px-4 py-2 bg-white text-black font-semibold rounded-xl hover:bg-violet-400 hover:text-white hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950"
        >
          Start Game
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-violet-600 hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-xl hover:bg-violet-600 hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}
