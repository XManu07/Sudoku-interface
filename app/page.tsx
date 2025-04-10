'use client'

import { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import AddSudokuPuzzle from './components/AddSudokuPuzzle';

export default function SudokuPage() {

  const [cellValues, setCellValues] = useState<(number | null)[]>(Array(81).fill(null));
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const handleCellClick = (index: number) => {
    setSelectedCell(index);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4
                    bg-[url('/bg2.jpeg')] bg-cover bg-center bg-no-repeat w-full">
      
      <SudokuGrid 
        cellValues={cellValues}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
      />
      
      <AddSudokuPuzzle onSubmit={handleSudokuSubmit} />
    </main>
  );
}