"use client";

import NumberButton from "./NumberButton";
import SidebarButtons from "./SidebarButtons";
import Cell from "./Cell";

interface SudokuGridProps {
  cellValues: (number | null)[];
  selectedCell: number | null;
  highlightedNumber: number | null;
  numbersAppearance: (number | null)[];
  onCellClick: (index: number) => void;
  onNumberClick: (number: number) => void;
  error: string;
  cellPencilValues: (number | null)[][];
}

export default function SudokuGrid({
  cellValues,
  selectedCell,
  highlightedNumber,
  numbersAppearance,
  onCellClick,
  onNumberClick,
  error,
  cellPencilValues,
}: SudokuGridProps) {
  const cells = Array(81)
    .fill(null)
    .map((_, cellIndex) => {
      return (
        <Cell
          key={cellIndex}
          isSelected={selectedCell === cellIndex}
          isHiglighted={highlightedNumber === cellValues[cellIndex]}
          onCellClick={onCellClick}
          index={cellIndex}
          value={cellValues[cellIndex]}
          pencilValues={cellPencilValues[cellIndex]}
        />
      );
    });

  const btnNumbers = [];
  for (let i = 1; i <= 9; i++) {
    btnNumbers.push(i);
  }
  const numberButtons = btnNumbers.map((number) => (
    <NumberButton
      number={number}
      key={number}
      onClick={() => onNumberClick(number)}
      numberAppearance={numbersAppearance[number]}
      isHighlighted={number === highlightedNumber}
    />
  ));

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 p-4 shadow-2xl rounded-2xl">
          <div className="grid grid-cols-9 grid-rows-9 border-4 border-gray-800 w-[min(90vw,450px)] h-[min(90vw,450px)]  mx-auto">
            {cells}
          </div>
        </div>
        {error && <div className="text-red-600 mb-3 text-xl">{error}</div>}
        <div className="flex flex-wrap justify-center items-center gap-1 w-full mx-auto mt-4 mb-8">
          {numberButtons}
        </div>
      </div>
    </div>
  );
}
