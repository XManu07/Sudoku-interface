'use client'

import { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import SidebarButtons from './components/SidebarButtons';
import { generate, solve } from 'sudoku-core';

export default function SudokuPage() {

  const [solution, setSolution] = useState<(number | null)[]>(Array(81).fill(null));
  const [cellValues, setCellValues] = useState<(number | null)[]>(Array(81).fill(null));
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(null);
  const [numbersAppearance, setNumbersAppearance] = useState<(number | null)[]>(Array(9).fill(null));
  const [error, setError] = useState("");

  const handleAdd = (sudokuString: string) => { 
    const newNumbersAppearance = Array(9).fill(null);
    const newValues = sudokuString.split('').map(charNumber => {
      if (charNumber ==='0') 
        return null;
      const number = parseInt(charNumber);
      newNumbersAppearance[number] = (newNumbersAppearance[number] || 0) + 1;
      return isNaN(number) ? null : number;
    })
    setCellValues(newValues);

    const solution = solve(newValues);
    if (solution.board) {
      const solArray = solution.board.map(number => {
        return number === 0 ? null : number;
      })
      setSolution(solArray); 
      setError("");
      setNumbersAppearance(newNumbersAppearance);
    }
    else {
      setError("Invalid sudoku puzzle.");
      setSolution(Array(81).fill(null));
      setCellValues(Array(81).fill(null));
      setNumbersAppearance(Array(9).fill(null));
    }
    
    setSelectedCell(null);
    setHighlightedNumber(null);
  }

  const handleSolve = () => {
    setCellValues(solution);
    setNumbersAppearance([]);
  };

  const handleClear = () => {
    setCellValues(Array(81).fill(null));
    setSelectedCell(null);
    setHighlightedNumber(null);
    setNumbersAppearance([]);
  };

  const handleNumberClick = (number: number) => {
    setHighlightedNumber(number);
    if (selectedCell !== null && number === solution[selectedCell]) {
      cellValues[selectedCell] = number;
      numbersAppearance[number] == null ? null : numbersAppearance[number]++; 
      setError("");
    }
    if (selectedCell == null) 
      setError("Select a cell.");
    else if (number !== solution[selectedCell])
      setError("Wrong number.")
  };
  
  const handleHint = () => {
  };

  const handleSave = () => {
  };

  const handleCellClick = (index: number) => {
    setSelectedCell(index);
    
    const clickedValue = cellValues[index];
    if (clickedValue !== null) {
      setHighlightedNumber(clickedValue);
    } else {
      setHighlightedNumber(null);
    }

    setError("");
  };

  const handleGenerate = () => {
    setError("");
    const sudoku = generate("easy");
    setCellValues(sudoku);

    const newNumbersAppearance = Array(9).fill(null);
    sudoku.map(number => {
      if (number)
        newNumbersAppearance[number] = (newNumbersAppearance[number] || 0) + 1;
    })
    setNumbersAppearance(newNumbersAppearance);

    const solution = solve(sudoku);
    if (solution.board) {
      const solArray = solution.board?.map(number => {
        return number === 0 ? null : number;
      })
      setSolution(solArray); 
    }
    else {
      setError("No solution found.");
      setSolution(Array(81).fill(null));
    }
  }

  return (
    <main className="flex min-h-screen flex-row justify-center p-4 items-start  gap-8
                    bg-[url('/PaperTexture20.jpg')] bg-cover bg-center bg-no-repeat w-full">
      
      <SudokuGrid 
        cellValues={cellValues}
        selectedCell={selectedCell}
        highlightedNumber={highlightedNumber} 
        onCellClick={handleCellClick}
        onNumberClick={handleNumberClick}
        numbersAppearance={numbersAppearance}
        error={error}
      />

      <SidebarButtons
        onAdd={handleAdd}
        onSolve={handleSolve}
        onClear={handleClear}
        onHint={handleHint}
        onSave={handleSave}
        onGenerate={handleGenerate}
      />
    </main>
  );
}