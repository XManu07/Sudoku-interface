"use client";

import Link from "next/link"; // Import Link from Next.js

export default function Landing() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-violet-300 drop-shadow-md">
          Sudoku Master
        </h1>
        <p className="text-xl text-gray-300">
          Challenge your brain. Train your focus. Enjoy the game.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Link href="/game" passHref>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-2xl hover:bg-violet-400 hover:text-white hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950 min-w-48">
            Start Game
          </button>
        </Link>
        <Link href="/login" passHref>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-2xl hover:bg-violet-600 hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950 min-w-48">
            Login
          </button>
        </Link>
        <Link href="/register" passHref>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-2xl hover:bg-violet-600 hover:shadow-[0px_0px_6px_3px_rgb(180,180,255)] transition-colors border-2 border-violet-950 min-w-48">
            Register
          </button>
        </Link>
      </div>
    </main>
  );
}
