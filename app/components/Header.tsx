"use client";

export default function Header() {
  return (
    <div className="w-full flex flex-row justify-between items-center px-4 py-3 bg-gray-900 rounded-4xl shadow-md border-2 border-violet-950">
      <div className="flex items-center gap-5">
        <img src="logo.png" className="w-10 h-auto" />
        <h1 className="text-3xl font-bold text-violet-500">Sudoku</h1>
      </div>
    </div>
  );
}
