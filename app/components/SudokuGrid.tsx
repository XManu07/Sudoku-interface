'use client'

import NumberButton from "./NumberButton";
import SidebarButtons from "./SidebarButtons";

interface SudokuGridProps {
  cellValues: (number | null)[];
  selectedCell: number | null;
  highlightedNumber: number | null;
  onAddPuzzle: () => void;
  onCellClick: (index: number) => void;
  onNumberClick: (number: number) => void;
  onSolve: () => void;
  onClear: () => void;
  onValidate: () => void;
  onHint: () => void;
  onSave: () => void;
  isSolving?: boolean;
}

export default function SudokuGrid({
  cellValues,
  selectedCell,
  highlightedNumber,
  onAddPuzzle,
  onCellClick,
  onNumberClick,
  onSolve,
  onClear,
  onValidate,
  onHint,
  onSave,
  isSolving = false
}: SudokuGridProps) {
  
    const cells = Array(81).fill(null).map((_, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const boxBorderRight = col === 2 || col === 5;
    const boxBorderBottom = row === 2 || row === 5;
    const isSelected = selectedCell === index;
    const isHighlighted = cellValues[index] !== null && cellValues[index] === highlightedNumber;
    
    return (
      <div 
        key={index} 
        onClick={() => onCellClick(index)}
        className={`
          cell w-full h-full flex items-center justify-center text-2xl p-0 outline-none bg-transparent
          ${boxBorderRight ? 'border-r-2 border-r-gray-800' : 'border-r border-r-gray-800'}
          ${boxBorderBottom ? 'border-b-2 border-b-gray-800' : 'border-b border-b-gray-800'}
          ${col === 0 ? 'border-l border-l-gray-800' : ''}
          ${row === 0 ? 'border-t border-t-gray-800' : ''}
          ${isSelected ? 'bg-gray-100' : isHighlighted ? 'bg-gray-300' : 'bg-transparent'}
          cursor-pointer hover:bg-gray-100 transition-colors
        `}
      >
        {cellValues[index]}
      </div>
    );
  });

  // Create number buttons with highlighting
  const btnNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numberButtons = btnNumbers.map((number) => (
    <NumberButton 
      number={number} 
      key={number} 
      onClick={() => onNumberClick(number)}
      isHighlighted={number === highlightedNumber}
    />
  ));

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="flex flex-col items-center">
        <div className='grid grid-cols-9 grid-rows-9 border-4 border-gray-800 w-[min(90vw,450px)] h-[min(90vw,450px)]  mx-auto'>
          {cells}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-1 w-full mx-auto mt-4 mb-8">
          {numberButtons}
        </div>
      </div>
      
      {/* Sidebar Buttons */}
      <SidebarButtons
        onAddPuzzle={onAddPuzzle}
        onSolve={onSolve}
        onClear={onClear}
        onValidate={onValidate}
        onHint={onHint}
        onSave={onSave}

      />
    </div>
  );
}