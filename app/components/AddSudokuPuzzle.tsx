'use client'

import { useState } from 'react';

interface AddSudokuPuzzleProps {
  onSubmit: (sudokuString: string) => void;
}

export default function AddSudokuPuzzle({ onSubmit }: AddSudokuPuzzleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sudokuInput, setSudokuInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSudokuInput('');
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSudokuInput(e.target.value);
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = () => {
    // Validate input - should be 81 characters of digits 0-9 or dots
    const cleanedInput = sudokuInput.replace(/\s/g, ''); // Remove whitespace
    
    if (cleanedInput.length !== 81) {
      setError(`Input must be exactly 81 characters (currently ${cleanedInput.length})`);
      return;
    }
    
    const isValid = /^[0-9.]+$/.test(cleanedInput);
    if (!isValid) {
      setError('Input can only contain digits 0-9 or dots for empty cells');
      return;
    }

    // Send the valid input to parent component
    onSubmit(cleanedInput);
    handleClose();
  };

  return (
    <div className="relative">
      {/* Plus Button */}
      <button 
        onClick={handleOpen}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Add custom Sudoku puzzle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Enter Your Sudoku Puzzle</h2>
            
            <p className="text-gray-600 mb-3">
              Enter 81 characters representing your Sudoku puzzle. Use 0 or . for empty cells and 1-9 for filled cells.
            </p>
            
            <textarea 
              value={sudokuInput}
              onChange={handleInputChange}
              className="w-full h-32 p-2 border border-gray-300 rounded mb-3 font-mono"
              placeholder="Example: 5.3...7.....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79"
            />
            
            {error && (
              <div className="text-red-500 mb-3">{error}</div>
            )}
            
            <div className="flex justify-end gap-2">
              <button 
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Load Puzzle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}