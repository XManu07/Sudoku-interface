'use client'

interface SidebarButtonsProps {
  onAddPuzzle: () => void;
  onSolve: () => void;
  onClear: () => void;
  onValidate: () => void;
  onHint: () => void;
  onSave: () => void;
}

export default function SidebarButtons({
  onSolve,
  onClear,
  onValidate,
  onHint,
  onSave,
  onAddPuzzle,
}: SidebarButtonsProps) {
  return (
    <div className="flex flex-col gap-6 ml-4 md:ml-6">
      <button
        onClick={onAddPuzzle}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors min-w-32"
      >
        Add Puzzle
      </button>

      <button
        onClick={onSolve}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors min-w-32"
      >
        Solve
      </button>
      
      <button
        onClick={onClear}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors min-w-32"
      >
        Clear
      </button>
      
      <button
        onClick={onValidate}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors min-w-32"
      >
        Validate
      </button>
      
      <button
        onClick={onHint}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors min-w-32"
      >
        Hint
      </button>
      
      <button
        onClick={onSave}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors min-w-32"
      >
        Save
      </button>
    </div>
  );
}