"use client";

import { useState } from "react";

interface SidebarButtonsProps {
  onAdd: (sudokustring: string) => void;
  onSolve: () => void;
  onClear: () => void;
  onHint: () => void;
  onGenerate: () => void;
}

export default function SidebarButtons({
  onAdd,
  onSolve,
  onClear,
  onHint,
  onGenerate,
}: SidebarButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [puzzleInput, setPuzzleInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setError(null);
  };

  const handlePuzzleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPuzzleInput(e.target.value);
    if (error) setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setPuzzleInput("");
    setError(null);
    setIsLoading(false);
  };

  const handleSubmit = () => {
    if (puzzleInput.length < 81) {
      setError("Puzzle must be 81 numbers long.");
    } else {
      handleClose();
      onAdd(puzzleInput);
    }
  };

  return (
    <div className="flex flex-col gap-8 md:ml-6">
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-gray-900 rounded-2xl text-white  hover:border-violet-300 hover:text-violet-300 transition-colors min-w-32 border-2 border-violet-950"
      >
        Add
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-950 opacity-95 flex flex-col items-center justify-center z-50">
          <p className="text-white mb-3">
            Enter 81 characters representing your Sudoku puzzle.
            <br />
            Use 0 for empty cells and 1-9 for filled cells.
          </p>
          <textarea
            value={puzzleInput}
            onChange={handlePuzzleInputChange}
            className="bg-white w-100 h-32 border border-gra300 rounded"
            placeholder="Your string here"
          />

          {error && <div className="text-red-500 mb-3">{error}</div>}
          {isLoading && <p className="text-blue-500 mb-2">Loading...</p>}

          <div className="flex justify-end mt-5 gap-2">
            <button
              className="px-4 py-2 text-black rounded bg-white hover:bg-gray-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-black rounded bg-white  hover:bg-gray-200"
            >
              Load Puzzle
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onGenerate}
        className="px-4 py-2 bg-gray-900 rounded-2xl text-white  hover:border-violet-300 hover:text-violet-300 transition-colors min-w-32 border-2 border-violet-950"
      >
        Generate
      </button>

      <button
        onClick={onSolve}
        className="px-4 py-2 bg-gray-900 rounded-2xl text-white  hover:border-violet-300 hover:text-violet-300 transition-colors min-w-32 border-2 border-violet-950"
      >
        Solve
      </button>

      <button
        onClick={onClear}
        className="px-4 py-2 bg-gray-900 rounded-2xl text-white  hover:border-violet-300 hover:text-violet-300 transition-colors min-w-32 border-2 border-violet-950"
      >
        Clear
      </button>

      <button
        onClick={onHint}
        className="px-4 py-2 bg-gray-900 rounded-2xl text-white  hover:border-violet-300 hover:text-violet-300 transition-colors min-w-32 border-2 border-violet-950"
      >
        Hint
      </button>
    </div>
  );
}