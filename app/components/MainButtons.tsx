import { Difficulty } from "sudoku-core";

interface MainButtonsProps {
  onPencilClick: () => void;
  onEraserClick: () => void;
  pencilActive: boolean;
  eraserActive: boolean;
  difficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
}

export default function MainButtons({
  onPencilClick,
  onEraserClick,
  pencilActive,
  eraserActive,
  difficulty,
  onDifficultyChange,
}: MainButtonsProps) {
  return (
    <div className="flex flex-col gap-12 mr-6 mt-22">
      <button
        onClick={onPencilClick}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-2xl shadow-md
          transition-colors ${
            pencilActive
              ? "bg-violet-500 border-violet-950 hover:bg-violet-400 text-white"
              : "bg-white text-black"
          }`}
        title="Pencil Mode"
      >
        <img
          src="/pencil.png"
          alt="Pencil"
          className="w-6 h-6 object-contain"
        />
        <span className="font-medium">Pencil</span>
      </button>

      <button
        onClick={onEraserClick}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-2xl shadow-md
          transition-colors ${
            eraserActive
              ? "bg-violet-500 border-violet-950 hover:bg-violet-400 text-white"
              : "bg-white text-black"
          }`}
        title="Eraser Mode"
      >
        <img
          src="/eraser.png"
          alt="Eraser"
          className="w-6 h-6 object-contain"
        />
        <span className="font-medium">Eraser</span>
      </button>
      <div className="flex flex-col rounded-2xl">
        <label
          htmlFor="difficulty-select"
          className="mb-2 font-medium text-white"
        >
          Difficulty
        </label>
        <select
          id="difficulty-select"
          value={difficulty}
          onChange={(e) => {
            onDifficultyChange(e.target.value as Difficulty);
          }}
          className="px-4 py-3 rounded-2xl border border-gray-300 bg-white shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-900"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
        </select>
      </div>
    </div>
  );
}
