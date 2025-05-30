"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Landing() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  const handleStartGameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // router.push(authToken ? "/game" : "/login");
    router.push('/game');
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white px-4 py-10 sm:px-6 sm:py-12">
      <header className="text-center mb-10 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-violet-300 drop-shadow-md">
          Sudoku Master
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Challenge your brain. Train your focus. Enjoy the game.
        </p>
      </header>

      <div className="flex flex-col gap-6 items-center w-full max-w-xs sm:max-w-sm">
        <button
          onClick={handleStartGameClick}
          className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-violet-500 hover:text-white transition-colors border-2 border-violet-950 shadow-md"
        >
          Start Game
        </button>
      </div>
    </main>
  );
}
